import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT SECTION */}
        <div className="footer-left">
          <h2 className="footer-logo">
            Turf<span>Book</span>
          </h2>

          <p className="footer-description">
            A trusted turf booking platform offering premium sports
            grounds for every game. Experience seamless booking
            and enjoy the thrill of playing anytime.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-right">

          <div className="contact-section">
            <h3>Contact Us</h3>
            <p><FiPhone /> +91 7010866496</p>
            <p><FiMail /> turfbook@gmail.com</p>
          </div>

          <div className="social-section">
            <h3>Social Media</h3>
            <div className="social-icons">
              <FaFacebookF />
              <FaInstagram />
              <FaWhatsapp />
              <FaLinkedinIn />
            </div>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 TurfBook. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
