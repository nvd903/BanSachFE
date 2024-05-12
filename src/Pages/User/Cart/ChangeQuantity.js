import style from "./Cart.module.scss";

import classNames from "classnames/bind";
import { useState } from "react";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../../ApiServices/cartApi";
import { useDispatch } from "react-redux";

const cx = classNames.bind(style);

function ChangeQuantity({ defaultValue, currentUser, item, setDataCart }) {
  const [quantity, setQuantity] = useState(defaultValue);
  const dispatch = useDispatch();
  return (
    <span className={cx("cartitem__quantity")}>
      <span
        className={cx("btnIncrease")}
        onClick={async () => {
          if (quantity > 0) {
            setQuantity(quantity - 1);

            const payload = {
              itemId: item.itemId,
            };
            const newdata = await decrementQuantity(
              currentUser._id,
              payload,
              dispatch
            );
            setDataCart(newdata.items);
          }
        }}
      >
        -
      </span>
      <span className={cx("input__quantity")}>{quantity}</span>
      <span
        className={cx("btnDecrease")}
        onClick={async () => {
          setQuantity(quantity + 1);

          const payload = {
            itemId: item.itemId,
          };
          const newdata = await incrementQuantity(
            currentUser._id,
            payload,
            dispatch
          );
          setDataCart(newdata.items);
        }}
      >
        +
      </span>
    </span>
  );
}

export default ChangeQuantity;
