import axios from "axios";

export const getDefault = async (idUser) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/deliveryaddress/${idUser}/getdefault`
    );
    return res.data;
  } catch (error) {}
};

export const getAll = async (idUser) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/deliveryaddress/${idUser}`
    );
    return res.data;
  } catch (error) {}
};

export const changeSelected = async (payload) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/deliveryaddress/changeselected`,
      payload
    );
    return res.data;
  } catch (error) {}
};

export const createAddress = async (payload) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/deliveryaddress/create`,
      payload
    );
    return res.data;
  } catch (error) {}
};

export const getAllAddress = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/deliveryaddress/`);
    return res.data;
  } catch (error) {}
};
