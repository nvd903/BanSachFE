import style from "./Payment.module.scss";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import classNames from "classnames/bind";
import { useState } from "react";
import { createAddress } from "../../../ApiServices/deliveryAddress";

const cx = classNames.bind(style);

function AddNewAddress({
  modal,
  toggle,
  currentUser,
}) {
  const [fullname, setFullname] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const AddNewAddress = async () => {
    const payload = { idUser: currentUser._id, fullname: fullname, phone: phone, address: address };
    const result = await createAddress(payload);
    if (result) {
      toggle();
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thêm địa chỉ nhận hàng</ModalHeader>
      <ModalBody>
        <div className={cx("newAddressWrapper")}> 
          <div className={cx("item_row")}>
            <label className={cx("item_label")}>Họ và tên: </label>
            <input className={cx("item_input")}  onChange={(e) => setFullname(e.target.value)}/>
          </div>

          <div className={cx("item_row")}>
            <label className={cx("item_label")}>Số điện thoại: </label>
            <input className={cx("item_input")}  onChange={(e) => setPhone(e.target.value)}/>
          </div>

          <div className={cx("item_row")}>
            <label className={cx("item_label")}>Địa chỉ: </label>
            <input className={cx("item_input")}  onChange={(e) => setAddress(e.target.value)}/>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={AddNewAddress}>
          Thêm
        </Button>
        <Button color="secondary" onClick={toggle}>
          Hủy bỏ
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddNewAddress;
