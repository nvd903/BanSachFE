import axios from "axios";

export const getABook = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3001/book/${id}`);
    return res.data;
  } catch (error) {
    console.log("get a book falure", error);
  }
};

export const getAllBooks = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/book`);
    return res.data;
  } catch (error) {
    console.log("get all book falure", error);
  }
};

export const getBooksPerPage = async (page = 1, perpage = 5) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/book/pagination/?page=${page}&perPage=${perpage}`
    );
    return res.data;
  } catch (error) {
    console.log("get book per page falure", error);
  }
};

export const createABook = async (payload) => {
  try {
    const res = await axios.post(`http://localhost:3001/book`, payload);
    return res.data;
  } catch (error) {
    console.log("create a book falure", error);
  }
};

export const updateABook = async (payload) => {
  try {
    const res = await axios.put(
      `http://localhost:3001/book/${payload._id}`,
      payload,
      {
        headers: { token: payload.accessToken },
      }
    );

    return res.data;
  } catch (error) {
    console.log("update a book falure", error);
  }
};
export const deleteABook = async (payload) => {
  try {
    await axios.delete(`http://localhost:3001/book/:${payload._id}`, payload, {
      headers: { token: payload.accessToken },
    });
  } catch (error) {
    console.log("delete a book falure", error);
  }
};

export const decrement = async (payload) => {
  //payload {_id, quantity}
  try {
    const res = await axios.put(
      `http://localhost:3001/book/decrementquantity`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("decrement a book falure", error);
  }
};

export const incrementInventory = async (payload) => {
  //payload {_id, quantity}
  try {
    const res = await axios.put(
      `http://localhost:3001/book/incrementinventory`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("increment inventory a book falure", error);
  }
};

export const updatePurchasedQuantity = async (payload) => {
  // body {_id,quanity, type: comfirm order or cancel order}
  try {
    const res = await axios.put(
      `http://localhost:3001/book/updatepurchasedquantity`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("increment inventory a book falure", error);
  }
};

export const updatePriorityPoints = async (payload) => {
  //payload{type: "addtocart" || "order", authorId, genreId, bookId}
  try {
    const res = await axios.put(
      `http://localhost:3001/book/updateprioritypoints`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("updatePriorityPoints a book falure", error);
  }
};

export const getSuggestList = async (payload) => {
  //payload{perPage, page}
  try {
    const res = await axios.post(
      `http://localhost:3001/book/listfavourite`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("updatePriorityPoints a book falure", error);
  }
};

export const getBestSellerList = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/book/bestseller`);
    return res.data;
  } catch (error) {
    console.log("updatePriorityPoints a book falure", error);
  }
};
