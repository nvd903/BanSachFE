import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

import "./Navi.scss";

function Navi() {
  return (
    <Nav className="header__nav">
      <NavItem>
        <NavLink to="/" className="nav__item  ">
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/category" className="nav__item">
          Category
        </NavLink>
      </NavItem>
    </Nav>
  );
}

export default Navi;
