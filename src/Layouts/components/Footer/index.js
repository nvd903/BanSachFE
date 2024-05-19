import "./Footer.scss";

import logo from "../../../assets/images/logo.png"

function Footer() {
  return <div className="container-fluid">
      <p>
        Copyright © By Nguyễn Văn Dũng.
      </p>
      <div className="footer_left">
        <div className="footer_contact">
          <p>Powered by</p> 
          <a
            href="https://1.envato.market/tf-merkulove"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="footer_logo"
              src={logo}
              alt="ThreeCents"
            />
          </a>
        </div>
        <p> Liên hệ: 19006868</p>
      </div>
  </div>;
}

export default Footer;
