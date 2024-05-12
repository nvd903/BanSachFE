import classNames from "classnames/bind";

import style from "./Cart.module.scss";
import { useSelector } from "react-redux";
import { getAllBooks } from "../../../ApiServices/booksApi";
import { useEffect, useState } from "react";
import { formatCurrent, handleLinkGGDrive } from "../../../Ultilities";
import Image from "../../../Components/Image";
import Button from "../../../Components/Button";
import ChangeQuantity from "./ChangeQuantity";
import { getCart } from "../../../ApiServices/cartApi";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function Cart() {
  // const carts = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const [dataAllBook, setDataAllBook] = useState([]);
  const [dataCart, setDataCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const fetchAllBook = async () => {
    const data = await getAllBooks();
    setDataAllBook(data);
  };

  const fetchCart = async () => {
    const data = await getCart(currentUser._id);
    setDataCart(data.items);
  };

  useEffect(() => {
    fetchAllBook();
    fetchCart();
  }, []);

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedItem([...selectedItem, name]);
    } else {
      const newSelectedItem = selectedItem.filter((item) => item !== name);
      setSelectedItem(newSelectedItem);
    }
  };

  const selectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      const allItems = dataCart.map((item) => item._id);
      setSelectedItem(allItems);
    } else {
      setSelectedItem([]);
    }
  };
  let total = 0;
  dataCart &&
    dataCart.length > 0 &&
    dataCart.map((item) => {
      if (selectedItem.includes(item._id)) {
        total += item.price * item.quantity;
      }
    });

  const dataSelectedItem =
    dataCart &&
    dataCart.length > 0 &&
    dataCart.filter((item) => selectedItem.includes(item._id));

  const navigate = useNavigate();
  const navigateToPaymentPage = () => {
    navigate("/payment", {
      state: {
        selectedItem: dataSelectedItem,
      },
    });
  };

  return (
    <div className={cx("container")}>
      <span>
        <h2>Giỏ hàng</h2>
      </span>

      <div className={cx("header")}>
        <span style={{ display: "block", width: "100px" }}>
          <p></p>
        </span>
        <span className={cx("cartitem__name")}>
          <p>Sản phẩm</p>
        </span>

        <span className={cx("cartitem__price")}>
          <p>Đơn giá</p>
        </span>
        <span className={cx("cartitem__quantity")}>
          <p>Số lượng</p>
        </span>
        <span className={cx("cartitem__total")}>
          <p>Thành tiền</p>
        </span>
      </div>
      {dataCart &&
        dataCart.length > 0 &&
        dataCart.map((item) => {
          const book = dataAllBook.find((book) => book._id === item.itemId);
          return (
            <div className={cx("rowItem")} key={item._id}>
              {book && (
                <>
                  <div className="checkbox-wrapper-46">
                    <input
                      className="inp-cbx"
                      id="cbx-46"
                      type="checkbox"
                      name={item._id}
                      onChange={handleChecked}
                      checked={selectedItem.includes(item._id)}
                    />
                  </div>

                  <Image
                    src={handleLinkGGDrive(book.thumnel)}
                    alt={book.name}
                    className={cx("cartitem__thumnel")}
                  />

                  <span className={cx("cartitem__name")}>
                    <p>{book?.name || ""}</p>
                  </span>
                  <span className={cx("cartitem__price")}>
                    <p>{formatCurrent(book?.price)}</p>
                  </span>
                  <ChangeQuantity
                    defaultValue={item.quantity}
                    item={item}
                    currentUser={currentUser}
                    price={book.price}
                    setDataCart={setDataCart}
                  />
                  <span className={cx("cartitem__total")}>
                    <p>{formatCurrent(book?.price * item?.quantity)}</p>
                  </span>
                </>
              )}
            </div>
          );
        })}

      <div className={cx("payment", "rowItem")}>
        <div className="checkbox-wrapper-46">
          <input
            className="inp-cbx"
            id="selectall"
            type="checkbox"
            onChange={selectAll}
            name="selectAll"
            checked={selectedItem.length === dataCart.length}
          />
          <label htmlFor="selectall">Chọn tất cả</label>
        </div>
        <span>
          <p style={{ color: "red" }}>
            Tổng thanh toán: {formatCurrent(total)}
          </p>
        </span>
        {selectedItem && selectedItem.length > 0 && (
          <Button onClick={navigateToPaymentPage}>Thanh toán</Button>
        )}
      </div>
    </div>
  );
}

export default Cart;
