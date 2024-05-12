import style from "./Payment.module.scss";
import Button from "../../../Components/Button";
import { getAll, getDefault } from "../../../ApiServices/deliveryAddress";

import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalSelectAddress from "./ModalSelectAddress";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrent, handleLinkGGDrive } from "../../../Ultilities";
import Image from "../../../Components/Image";
import {
  decrement,
  getAllBooks,
  updatePriorityPoints,
} from "../../../ApiServices/booksApi";
import { createNewOrder } from "../../../ApiServices/orderApi";
import { toast } from "react-toastify";
import { removeCart } from "../../../ApiServices/cartApi";

const cx = classNames.bind(style);

function Payment() {
  const [defaultAddress, setDefaultAddress] = useState();
  const [allAddress, setAllAddress] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [dataAllBook, setDataAllBook] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchDefaultAddress = async () => {
    const result = await getDefault(currentUser._id);
    //log
    setDefaultAddress(result);
  };

  const fetchAllAddres = async () => {
    const result = await getAll(currentUser._id);
    //log
    setAllAddress(result);
  };

  const fetchAllBook = async () => {
    const data = await getAllBooks();
    setDataAllBook(data);
  };

  useEffect(() => {
    fetchDefaultAddress();
    fetchAllAddres();
    fetchAllBook();
  }, []);

  //lấy dữ liệu từ cartpage
  const location = useLocation();
  const dataSelectedItem = location.state.selectedItem;
  let totalAmount = 0;
  dataSelectedItem.map((item) => (totalAmount += item.quantity * item.price));
  //log
  console.log("a", dataSelectedItem);

  const handleOrder = async () => {
    const payload = {
      userId: currentUser._id,
      items: [...dataSelectedItem],
      totalAmount: totalAmount,
      deliveryAddressId: defaultAddress._id,
    };

    const result = await createNewOrder(payload);

    if (result) {
      await Promise.all(
        dataSelectedItem.map(async (item) => {
          await removeCart(currentUser._id, { itemId: item.itemId }, dispatch);

          await decrement({ _id: item.itemId, quantity: item.quantity });
        })
      );

      const payloads = dataSelectedItem.map((item) => {
        const filter = dataAllBook.filter((ele) => ele._id === item.itemId);
        return {
          type: "order",
          authorId: filter[0].author,
          genreId: filter[0].genres,
          bookId: filter[0]._id,
        };
      });
      payloads.map(async (payload) => {
        await updatePriorityPoints(payload);
      });

      navigate("/");
      toast.success("Order successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className={cx("payment_container")}>
      <div className={cx("address__default")}>
        <h3>Địa chỉ nhận hàng</h3>
        {defaultAddress && (
          <div className={cx("infor__address")}>
            <p>{defaultAddress.fullname}</p>
            <p>{defaultAddress.phone}</p>
            <p>{defaultAddress.address}</p>
            {defaultAddress.status === "default" && (
              <p style={{ color: "red" }}>Mặc định</p>
            )}
            <Button onClick={toggle}>Thay đổi</Button>
          </div>
        )}
        <ModalSelectAddress
          modal={modal}
          toggle={toggle}
          data={allAddress}
          currentUser={currentUser}
          setDefaultAddress={setDefaultAddress}
        />
      </div>

      <div className={cx("order__detail__container")}>
        {dataSelectedItem.map((item) => {
          const book = dataAllBook.find((book) => book._id === item.itemId);
          return (
            <div className={cx("rowItem")} key={item._id}>
              {book && (
                <>
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
                  <span className={cx("cartitem__price")}>
                    <p>{item.quantity}</p>
                  </span>

                  <span className={cx("cartitem__total")}>
                    <p>{formatCurrent(book?.price * item?.quantity)}</p>
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className={cx("choose__option__payment")}>
        <h3>Chọn hình thức thanh toán</h3>
        <div className={cx("option_payment")}>
          <input type="radio" />
          <label>Chuyển khoản qua ngân hàng</label>
        </div>
        <div className={cx("option_payment")}>
          <input type="radio" />
          <label>Thanh toán khi giao hàng</label>
        </div>
      </div>

      <div className={cx("order__info")}>
        {/* <div className={cx("row-item")}>
          <input placeholder="Nhập mã giảm giá" />
          <button>Áp dụng</button>
        </div> */}
        <div className={cx("row-item")}>
          <p>Tổng tiền hàng</p>
          <p>{formatCurrent(totalAmount)}</p>
        </div>
        {/* <div className={cx("row-item")}>
          <p>Phí vận chuyển</p>
          <p>-</p>
        </div> */}
        <div className={cx("row-item")}>
          <p>Tổng thanh toán</p>
          <p>{formatCurrent(totalAmount)}</p>
        </div>
        <button className={cx("btn__order")} onClick={handleOrder}>
          Đặt hàng
        </button>
      </div>
    </div>
  );
}

export default Payment;
