import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import CardProduct from "../../../Components/CardProduct";
import sneaker from "../../../assets/images/sneakers1.png";
import { useEffect } from "react";
import { getAllUsers } from "../../../store/apiRequest";
import "./AccountManagement.scss";

function AccountManagerment() {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers(currentUser.accessToken, dispatch);
  }, []);
  const listUser = useSelector((state) => state.users.users?.allUsers);

  console.log("listUser", listUser);
  return (
    <Container fluid="md">
      <div className="accountpage__inner">
        <div className="accountpage__main">
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user) => {
              return (
                <CardProduct
                  key={user._id}
                  srcImg={sneaker}
                  cardTitle={user.username}
                />
              );
            })}
        </div>
      </div>
    </Container>
  );
}

export default AccountManagerment;
