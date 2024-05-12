import style from "./Payment.module.scss";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import classNames from "classnames/bind";
import { useState } from "react";
import { changeSelected } from "../../../ApiServices/deliveryAddress";

const cx = classNames.bind(style);

function ModalSelectAddress({
  modal,
  toggle,
  data,
  currentUser,
  setDefaultAddress,
}) {
  const [selected, setSelected] = useState([]);
  const handleChooseAddress = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelected(name);
    }
  };

  const handleUpdateAddress = async () => {
    const payload = { idUser: currentUser._id, id: selected };
    const result = await changeSelected(payload);
    if (result) {
      setDefaultAddress(result);
      toggle();
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Chọn địa chỉ nhận hàng</ModalHeader>
      <ModalBody>
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div className={cx("choose__address")} key={item._id}>
                <input
                  className="inp-cbx"
                  id="selectall"
                  type="radio"
                  name={item._id}
                  checked={selected.includes(item._id)}
                  onChange={handleChooseAddress}
                />
                <div className={cx("choose__label")}>
                  <div className={cx("name__phone")}>
                    <p>{item.fullname}</p>
                    <p>{item.phone}</p>
                  </div>
                  <div className={cx("name__phone")}>
                    <p>{item.address}</p>
                    {item.status === "default" && (
                      <p style={{ color: "red" }}>Mặc định</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdateAddress}>
          Cập nhật
        </Button>
        <Button color="secondary" onClick={toggle}>
          Hủy bỏ
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalSelectAddress;
