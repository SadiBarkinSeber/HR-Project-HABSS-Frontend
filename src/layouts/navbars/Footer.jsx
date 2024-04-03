import React from "react";
import { Row, Col } from "react-bootstrap";

const footerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "auto",
    backgroundColor: "#f8f9fa",
};

const Footer = () => {
    return (
        <div id="footer" style={footerStyle}>
            <Row style={{ width: "100%", marginTop: "30px" }}>
                <Col xs={6} sm={3} className="text-center mb-3 mb-sm-0">
                    <h4><i className="fas fa-map-marker-alt"></i> Adresimiz</h4>
                    <span>34710 Kadıköy/İstanbul</span>
                </Col>
                <Col xs={6} sm={3} className="text-center mb-3 mb-sm-0">
                    <h4><i className="far fa-envelope-open"></i> Önerileriniz için</h4>
                    <span>Habbs@bilgeadamboost.com</span>
                </Col>
                <Col xs={6} sm={3} className="text-center mb-3 mb-sm-0">
                    <h4><i className="fas fa-phone"></i> İletişim</h4>
                    <span>+90 532 324 32 34</span>
                </Col>
                <Col xs={1} sm={9} className="text-center" style={{ marginTop: "30px" }}>
                    <p>HABSŠ Corporation © 2024 <a href="">HABSŠ</a></p>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
