import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../store/apiRequest";

import "./Signup.scss";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { username, password, email };

    registerUser(newUser, dispatch, navigate);
  };
  return (
    <div className="signup__container">
      <form onSubmit={handleRegister} className="signup__form">
        <h1>Signup</h1>
        <div className="form_control ">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small></small>
          <span></span>
        </div>
        <div className="form_control ">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            onChange={(e) => setUsername(e.target.value)}
          />
          <small></small>
          <span></span>
        </div>

        <div className="form_control ">
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <small></small>
          <span></span>
        </div>

        <button type="submit" className="btn_submit">
          Đăng ký
        </button>

        <div className="signup_link">
          Bạn đã có tài khoản? <Link to="/loggin">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
