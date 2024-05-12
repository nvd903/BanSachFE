import { Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../../store/apiRequest";
import logo from "../../../assets/images/logo.png";
import catAvartar from "../../../assets/images/cat.jpg";
import "./Header.scss";

import Button from "../../../Components/Button";
import Menu from "../../../Components/Popper/Menu";
import Navi from "../Navi";
import Search from "../Search";
import { getCart } from "../../../ApiServices/cartApi";
import { useEffect, useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataCart, setDataCart] = useState([]);

  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const carts = useSelector((state) => state.cart.items);

  const fetchCart = async () => {
    const data = await getCart(currentUser._id);
    setDataCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const data = [];
  const cartItem =
    data && data.length > 0 ? data : [{ label: "Chưa có sản phẩm nào" }];

  //test

  //data menu user
  const DATA_MENU_ITEMS_USER = [
    {
      label: "My Profile",
      to: "/getme",
    },
    {
      label: "Log out",
      type: "fn-logout",
    },
  ];

  // data menu admin
  const DATA_MENU_ITEMS_ADMIN = [
    { label: "Go to the Admin page", to: "/admin" },
  ];

  // data menu user khi chưa đăng nhâp
  const DATA_MENU_ITEMS_USER_NOT_LOGGED_IN = [
    { label: "Log in", to: "/loggin" },
    {
      label: "Sign up",
      to: "/signup",
    },
  ];

  //handle logout
  const handleLogout = () => {
    logoutUser(currentUser.accessToken, dispatch, navigate);
    // localStorage.clear();
    // window.location.href = "/loggin";
  };

  //sử lý sự kiện cho nút có chức năng fn
  const handleLogicMenu = (menuItem) => {
    switch (menuItem.type) {
      case "fn-logout":
        //handle logic nên viết hàm bên ngoài ở đây chỉ gọi hàm thì sẽ trông sạch sẽ hơn
        handleLogout();
        break;

      default:
    }
  };

  // hàm render header action sau khi đăng nhâp thành công
  const renderHeaderActionSignedUp = () => {
    //biến đk xác định có là admin hay k
    const isAdmin = !!currentUser.isadmin;
    return isAdmin ? (
      <Menu
        items={[...DATA_MENU_ITEMS_USER, ...DATA_MENU_ITEMS_ADMIN]}
        interactive={true}
        onChange={handleLogicMenu}
      >
        <span className="avartar__user">
          <img src={catAvartar} alt="avatar" />
        </span>
      </Menu>
    ) : (
      <Menu
        items={DATA_MENU_ITEMS_USER}
        interactive={true}
        onChange={handleLogicMenu}
      >
        <span className="avartar__user">
          <img src={catAvartar} alt="avatar" />
        </span>
      </Menu>
    );
  };

  return (
    <div className="header__container">
      <Container fluid="md" className="header__inner">
        <div className="header__hide">
          <Link to="/" className="logo--link d-none d-sm-block">
            <img src={logo} alt="logo" />
          </Link>

          <Row className="d-none d-sm-block">
            <Navi />
          </Row>
        </div>

        {/* search */}
        <Search />

        <div className="header__action">
          {currentUser ? (
            renderHeaderActionSignedUp()
          ) : (
            <Menu items={DATA_MENU_ITEMS_USER_NOT_LOGGED_IN} interactive={true}>
              <div>
                <Button leftIcon={<i className="fa fa-user-o " />} />
              </div>
            </Menu>
          )}

          <Menu items={cartItem}>
            <span>
              <Button
                to="/cart"
                leftIcon={<i className="fa fa-shopping-bag " />}
                badge
                countBadge={carts.length}
              ></Button>
            </span>
          </Menu>
        </div>
      </Container>
    </div>
  );
}

export default Header;
