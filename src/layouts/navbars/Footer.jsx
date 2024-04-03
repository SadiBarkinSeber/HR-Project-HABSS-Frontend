import React from "react";
import { Row, Col } from "react-bootstrap";

const footerStyle = {
  width: "100%",
  height: "auto",
  backgroundColor: "#f8f9fa",
  marginTop: "15%",
  bottom: 0, // Alt kenara sabitleme
};

const Footer = () => {
  return (
    <div id="footer" style={footerStyle}>
      <Row className="align-items-center" style={{ width: "100%" }}>
        <Col xs={6} sm={3} className="text-center">
          <h4 style={{ fontSize: "14px" }}>
            <i className="fas fa-map-marker-alt"></i> Adresimiz
          </h4>
          <span style={{ fontSize: "12px" }}>34710 Kadıköy/İstanbul</span>
        </Col>
        <Col xs={6} sm={3} className="text-center">
          <h4 style={{ fontSize: "14px" }}>
            <i className="far fa-envelope-open"></i> Önerileriniz için
          </h4>
          <span style={{ fontSize: "12px" }}>Habbs@bilgeadamboost.com</span>
        </Col>
        <Col xs={6} sm={3} className="text-center">
          <h4 style={{ fontSize: "14px" }}>
            <i className="fas fa-phone"></i> İletişim
          </h4>
          <span style={{ fontSize: "12px" }}>+90 532 324 32 34</span>
        </Col>
        <Col xs={6} sm={3} className="text-center">
          <p style={{ fontSize: "12px" }}>
            HABSŠ Corporation © 2024 <b>HABSŠ</b>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
