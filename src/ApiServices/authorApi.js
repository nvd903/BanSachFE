import axios from "axios";

export const createAAuthor = async (payload) => {
  try {
    const res = await axios.post(`http://localhost:3001/author`, payload);
    return res.data;
  } catch (error) {
    console.log("create a author err", error);
  }
};

export const getAAuthor = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3001/author/${id}`);
    return res.data;
  } catch (error) {
    console.log("get a author err", error);
  }
};

export const getAllAuthor = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/author`);
    return res.data;
  } catch (error) {
    console.log("get all author err", error);
  }
};

export const getAuthorPerPage = async (page = 1, perPage = 5) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/author/getpage/?page=${page}&perpage=${perPage}`
    );
    return res.data;
  } catch (error) {
    console.log("get author per page err", error);
  }
};

export const updateAAuthor = async (id, payload, accessToken) => {
  try {
    const result = await axios.put(
      `http://localhost:3001/author/${id}`,
      payload,
      {
        headers: { token: accessToken },
      }
    );
    return result.data;
  } catch (error) {
    console.log("update a author err", error);
  }
};

export const deleteAAuthor = async (id, accessToken) => {
  try {
    const res = await axios.delete(`http://localhost:3001/author/${id}`, {
      headers: { token: accessToken },
    });
    return res.data;
  } catch (error) {
    console.log("delete a author err", error);
  }
};
