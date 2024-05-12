import axios from "axios";
import {
  addToCartRedux,
  decrementQuantityRedux,
  incrementQuantityRedux,
  removeItemRedux,
} from "../store/cartSlice";

export const getCart = async (idUser) => {
  try {
    const res = await axios.get(`http://localhost:3001/cart/${idUser}`);
    return res.data;
  } catch (error) {
    console.log("loi get cart");
  }
};

export const addToCart = async (idUser, payload, dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/cart/${idUser}/addtocart`,
      payload
    );
    if (res) {
      // const { items } = res.data;
      dispatch(addToCartRedux(payload));
      return res.data;
    }
  } catch (error) {
    console.log("lỗi", error);
  }
};

export const changeQuantity = async (idUser, payload) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/cart/${idUser}/changequantity`,
      payload
    );
    if (res) {
      return res.data;
    }
  } catch (error) {}
};

export const incrementQuantity = async (idUser, payload, dispatch) => {
  //payload = {itemId}
  try {
    const res = await axios.post(
      `http://localhost:3001/cart/${idUser}/incrementquantity`,
      payload
    );
    if (res) {
      dispatch(incrementQuantityRedux(payload));
      return res.data;
    }
  } catch (error) {
    console.log("looix");
  }
};
export const decrementQuantity = async (idUser, payload, dispatch) => {
  //payload = {itemId}
  try {
    const res = await axios.post(
      `http://localhost:3001/cart/${idUser}/decrementquantity`,
      payload
    );
    if (res) {
      dispatch(decrementQuantityRedux(payload));
      return res.data;
    }
  } catch (error) {
    console.log("loi");
  }
};

export const removeCart = async (idUser, payload, dispatch) => {
  //payload = {itemId}
  try {
    console.log("aaa");
    const res = await axios.post(
      `http://localhost:3001/cart/${idUser}/removecart`,
      payload
    );
    if (res) {
      console.log("cos res");
      console.log("payload 1", payload);
      dispatch(removeItemRedux(payload));
      console.log("redex ok");
      return res.data;
    }
  } catch (error) {
    console.log("loi", error);
  }
};
