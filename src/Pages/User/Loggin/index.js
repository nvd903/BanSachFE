import { Link, useNavigate } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./Loggin.scss";
import { loginUser } from "../../../store/apiRequest";

const config = {
  apiKey: "AIzaSyC5xawfJU-KkcupNmeQFmxVAyYDdcGvWPM",
  authDomain: "fir-99c50.firebaseapp.com",
};

firebase.initializeApp(config);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  // callbacks: {
  //   // Avoid redirects after sign-in.
  //   signInSuccessWithAuthResult: () => false,
  // },
};

function Loggin() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, password };
    loginUser(newUser, dispatch, navigate);
  };
  return (
    <div className="loggin__container">
      <form onSubmit={handleSubmit} className="loggin__form">
        <h1>Loggin</h1>
        <div className="form_control ">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            onChange={(e) => setUsername(e.target.value)}
            id="user__name"
          />
          <small></small>
          <span></span>
        </div>

        <div className="form_control ">
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <small></small>
          <span></span>
        </div>

        <button type="submit" className="btn_submit" id="btn__login">
          Đăng nhập
        </button>

        <div className="signup_link">
          Bạn chưa có tài khoản? <Link to="/signup">Đăng kí</Link>
        </div>

        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </form>
    </div>
  );
}

export default Loggin;
