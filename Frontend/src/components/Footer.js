import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="gy-3">
          {/* Company Info */}
          <Col md={4}>
            <h5>MyShop</h5>
            <p>Quality products at the best prices. Your satisfaction is our priority.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">FAQs</a></li>
              <li><a href="/privacy-policy" className="text-light text-decoration-none">Privacy Policy</a></li>
            </ul>
          </Col>

          {/* Social Media & Payments */}
          <Col md={4} className="text-center">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center gap-3 mb-3">
              <a href="https://facebook.com" className="text-light fs-4"><FaFacebook /></a>
              <a href="https://twitter.com" className="text-light fs-4"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-light fs-4"><FaInstagram /></a>
            </div>
            <h5>We Accept</h5>
            <div className="d-flex justify-content-center gap-3">
              <FaCcVisa size={40} />
              <FaCcMastercard size={40} />
              <FaPaypal size={40} />
            </div>
          </Col>
        </Row>

        <hr className="bg-light mt-4" />

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} MyShop. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
