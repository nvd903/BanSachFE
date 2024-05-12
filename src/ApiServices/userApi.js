import axios from "axios";

export const getAllUsers = async (accessToken) => {
  try {
    const res = await axios.get("http://localhost:3001/user/", {
      headers: { token: accessToken },
    });
    if (res) {
      return res.data;
    } else {
      console.log("get all users failure because res is exist");
    }
  } catch (error) {}
};

export const updateUser = async (payload, accessToken, id) => {
  try {
    const res = await axios.put(`http://localhost:3001/user/${id}`, payload, {
      headers: { token: accessToken },
    });
    return res.data;
  } catch (error) {
    console.log("update failure");
  }
};
