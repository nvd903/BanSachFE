import axios from "axios";

export const createNewOrder = async (payload) => {
  try {
    const res = await axios.post(`http://localhost:3001/order`, payload);
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log("sai", error);
  }
};

export const getAllOrder = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/order`);
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log("sai", error);
  }
};

export const updatedState = async (payload) => {
  //payload {_id, state}
  try {
    const res = await axios.put(
      `http://localhost:3001/order/updatestate`,
      payload
    );
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log("sai", error);
  }
};
