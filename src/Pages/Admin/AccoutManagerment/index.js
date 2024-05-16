import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import BannerTilte from "../../../Layouts/AdminLayout/components/BannerTitle";
import { getAllUsers } from "../../../ApiServices/userApi";
import { toast } from "react-toastify";
import BookDataGrid from "./BookDataGrid";

// import { getAllUsers } from "../../../store/apiRequest";
import "./AccountManagement.scss";

function AccountManagerment() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [dataAllUsers, setDataAllUsers] = useState([]);
  useEffect(() => {
    fetchDataAllUsers();
  }, []);

  const fetchDataAllUsers = async () => {
    if (!currentUser) {
      toast.error("chưa đăng nhâp");
      return;
    } else {
      if (!currentUser.isadmin) {
        toast.error("not authenzation");
      } else {
        const res = await getAllUsers(currentUser.accessToken);
        setDataAllUsers(res);
      }
    }
  };





  return (
    <Grid container className="genre_container copy">
      <BannerTilte
        titlePage={"Accounts Management Page"}
        btnCreate = {false}
      />
      <BookDataGrid
        allUsers={dataAllUsers}
        currentUser={currentUser}
      />
      {/* <Pagination page={page} setPage={setPage} totalPage={totalPages || 10} /> */}
    </Grid>
  );
}

export default AccountManagerment;
