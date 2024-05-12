import axios from "axios";

export const search = async (q, limit = "less", type = "books") => {
  try {
    const res = await axios.get(`http://localhost:3001/search`, {
      params: {
        q: q,
        limit,
        type,
      },
    });
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
