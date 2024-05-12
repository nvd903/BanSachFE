import classNames from "classnames/bind";

import style from "./OrderManagement.module.scss";
import BannerTilte from "../../../Layouts/AdminLayout/components/BannerTitle";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllOrder, updatedState } from "../../../ApiServices/orderApi";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import { getAllUsers } from "../../../ApiServices/userApi";
import { getAllAddress } from "../../../ApiServices/deliveryAddress";
import { formatCurrent } from "../../../Ultilities";
import {
  getAllBooks,
  incrementInventory,
  updatePurchasedQuantity,
} from "../../../ApiServices/booksApi";

const cx = classNames.bind(style);

function OrderManagement() {
  //   const currentUser = useSelector((state) => state.auth.login?.currentUser);

  //   const [dataAllUsers, setDataAllUsers] = useState([]);
  const [dataOrder, setDataOrder] = useState();
  const [dataDeliveryAddress, setDataDeliveryAddress] = useState();
  const [dataAllBooks, setDataAllBooks] = useState([]);

  const fetchDataOrder = async () => {
    const result = await getAllOrder();
    setDataOrder(result);
  };

  //   const fetchDataAllUsers = async () => {
  //     if (!currentUser) {
  //       toast.error("chưa đăng nhâp");
  //       return;
  //     } else {
  //       if (!currentUser.isadmin) {
  //         toast.error("not authenzation");
  //       } else {
  //         const res = await getAllUsers(currentUser.accessToken);
  //         setDataAllUsers(res);
  //       }
  //     }
  //   };

  const fetchInforDelivery = async () => {
    const result = await getAllAddress();
    setDataDeliveryAddress(result);
  };

  const fetchAllBooks = async () => {
    const result = await getAllBooks();
    setDataAllBooks(result);
  };

  useEffect(() => {
    fetchDataOrder();
    // fetchDataAllUsers();
    fetchInforDelivery();
    fetchAllBooks();
  }, []);

  const handleConfirmOrder = async (item) => {
    await Promise.all(
      item.items.map(async (book) => {
        const result = await updatePurchasedQuantity({
          _id: book.itemId,
          quantity: book.quantity,
          type: "confirm order",
        });
        if (result === "update purchased quantity successful") {
          toast.success("confirm successfully");
        }
      })
    );
    await updatedState({ _id: item._id, state: "confirm" });
  };

  const handleCancelOrder = async (item) => {
    await updatedState({ _id: item._id, state: "cancel" });
    await Promise.all(
      item.items.map(async (book) => {
        await incrementInventory({ _id: book.itemId, quantity: book.quantity });
      })
    );
  };
  return (
    <Grid container className={cx("container")}>
      <BannerTilte titlePage={"Order Management Page"} />
      {dataOrder &&
        dataOrder.length > 0 &&
        dataOrder.map((item) => {
          const user =
            dataDeliveryAddress &&
            dataDeliveryAddress.length > 0 &&
            dataDeliveryAddress.find((user) => user.idUser === item.userId);
          let state = "";
          if (item.state === "pending") {
            state = "Chờ xử lý";
          }
          if (item.state === "confirm") {
            state = "Người bán đang chuẩn bị hàng";
          }
          if (item.state === "cancel") {
            state = "Đơn hàng đã bị hủy";
          }
          return (
            <div className={cx("order")} key={item._id}>
              <div className={cx("infor__order")}>
                <span>Người nhận: {user && user.fullname}</span>
                <span>Số điện thoại: {user && user.phone}</span>
                <span>Địa chỉ nhận: {user && user.address}</span>
                <span>
                  Tổng thanh toán: {item && formatCurrent(item.totalAmount)}
                </span>
                <span>Trạng thái: {state}</span>
              </div>
              {item.items.map((book) => {
                const infor = dataAllBooks.find(
                  (item) => item._id === book.itemId
                );
                return (
                  <div className={cx("infor__book")} key={book._id}>
                    <span className={cx("book__name")}>
                      Tên sách: {infor && infor.name}
                    </span>
                    <span className={cx("book__col")}>
                      Đơn giá: {infor && formatCurrent(infor.price)}
                    </span>
                    <span className={cx("book__col")}>
                      Số lượng: {book.quantity}
                    </span>
                    <span className={cx("book__col")}>
                      Thành tiền:{" "}
                      {infor && formatCurrent(book.quantity * infor.price)}
                    </span>
                  </div>
                );
              })}

              {item && item.state === "pending" && (
                <div className={cx("action")}>
                  <button
                    className={cx("comfirmbtn")}
                    onClick={() => handleConfirmOrder(item)}
                  >
                    Xác nhận
                  </button>
                  <button
                    className={cx("cancelbtn")}
                    onClick={() => {
                      handleCancelOrder(item);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          );
        })}
    </Grid>
  );
}

export default OrderManagement;
