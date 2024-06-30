// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./index.scss";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const linkStyle = {
    color: "black",
    textDecoration: "none",
  };
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="logo">
          <Link to="/">
            <img
              src="https://sgweb.vn/wp-content/uploads/2022/12/thiet-ke-logo-shop-hoa-flora-1.jpg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="footer-section">
          <h2>ABOUT US</h2>
          <br />
          <div className="social-icons">
            <Link to="/" rel="nofollow" style={linkStyle}>
              Why use need choose Flora
            </Link>
          </div>
          <div className="icon">
            <FaTiktok className="icon-con" />
            <FaFacebook className="icon-con" />
            <FaInstagram className="icon-con" />
            <FaYoutube className="icon-con" />
          </div>
        </div>
        <div className="footer-section">
          <h2>CONTACT Flora</h2>
          <br />
          <div className="hotline">
            <p>Hotline</p>
            <span>
              CN HCM:{" "}
              <a href="tel:0916306945" rel="nofollow" style={linkStyle}>
                091 630 6945
              </a>{" "}
              (phím 1)
            </span>
            <span>
              FEEDBACK:{" "}
              <a href="tel:0123456890" rel="nofollow" style={linkStyle}>
                012 345 6780
              </a>{" "}
              (phím 2)
            </span>
            <p>Showrooms</p>
            <span>
              CN HCM:{" "}
              <a
                href="https://www.google.com/maps/place/VNUHCM+Student+Cultural+House/@10.8751238,106.7981485,17z/data=!3m1!4b1!4m6!3m5!1s0x3174d8a6b19d6763:0x143c54525028b2e!8m2!3d10.8751238!4d106.8007234!16s%2Fg%2F11hd1pf9gj?entry=ttu"
                rel="nofollow"
                target="_blank"
                style={linkStyle}
              >
                Nhà Văn Hóa Sinh Viên
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © Copy right 2024 <strong>Nguyen Thanh Hai</strong>.
        </p>
      </div>
    </div>
  );
};

export default Footer;
