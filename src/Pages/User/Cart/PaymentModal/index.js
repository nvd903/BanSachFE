// import Wrapper from "../../../../Components/Popper/Wrapper";
import style from "./PaymentModal.module.scss";

import classNames from "classnames/bind";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const cx = classNames.bind(style);

function PaymentModal({ modal = false, toggle, args }) {
  return (
    <Modal isOpen={modal} toggle={toggle} {...args} fullscreen>
      <ModalHeader toggle={toggle}>Thanh toán</ModalHeader>
      <ModalBody>
        <div className={cx("payment_container")}>
          <div className={cx("user_info")}>
            <div className={cx("delivery_info__user")}>
              <h3>Thông tin nhận hàng</h3>
              <input placeholder="Email" />
              <input placeholder="Họ và tên" />
              <input placeholder="Số điện thoại (tùy chọn)" />
              <input placeholder="Địa chỉ(tùy chọn)" />
              <input placeholder="Tỉnh thành" />
              <input placeholder="Quận huyện" />
              <input placeholder="Phường xã" />
              <textarea placeholder="Ghi chú" />
            </div>
            <div className={cx("payment")}>
              <h3>Thanh toán</h3>
              <div className={cx("option_payment")}>
                <input type="radio" />
                <label>Chuyển khoản qua ngân hàng</label>
              </div>
              <div className={cx("option_payment")}>
                <input type="radio" />
                <label>Thanh toán khi giao hàng</label>
              </div>
            </div>
          </div>
          <div className={cx("product_info")}>
            <h3>Đơn hàng</h3>
            <div className={cx("item")}></div>
            <div className={cx("row-item")}>
              <input placeholder="Nhập mã giảm giá" />
              <button>Áp dụng</button>
            </div>
            <div className={cx("row-item")}>
              <p>Tạm tính</p>
              <p>22.500đ</p>
            </div>
            <div className={cx("row-item")}>
              <p>Phí vận chuyển</p>
              <p>-</p>
            </div>
            <div className={cx("row-item")}>
              <p>Tổng cộng</p>
              <p>22.500đ</p>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Do Something
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default PaymentModal;
