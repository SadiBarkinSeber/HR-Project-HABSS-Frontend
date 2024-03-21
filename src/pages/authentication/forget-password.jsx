import { useState } from "react";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { checkEmailExists } from "../api/api";
import AuthLayout from "../../layouts/AuthLayout";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@bilgeadamboost\.com$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Lütfen email adresinizi giriniz.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Geçerli bir Bilge Adam Boost email adresi girin.");
      return;
    }

    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        console.log("Email adresi var.");
      } else {
        setError("Girilen email adresi sistemde bulunamadı.");
      }
    } catch (error) {
      console.error("Email kontrolü sırasında bir hata oluştu:", error);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <Row
      className="align-items-center justify-content-center g-0 min-vh-100"
      style={{
        backgroundImage: `url('../../../dist/images/background/login-background6.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link to="/">
                <Image
                  src="../../../dist/images/brand/logo/habss-logo-small1.png"
                  className="mb-2"
                  alt=""
                />
              </Link>
              <p className="mb-6">
                Endişelenmeyin, şifrenizi sıfırlamanız için size bir e-posta
                göndereceğiz.
              </p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email adresinizi giriniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              {error && <p className="text-danger">{error}</p>}

              <div className="mb-3 d-grid">
                <Button variant="primary" type="submit">
                  Şifreyi Sıfırla
                </Button>
              </div>
              <span>
                Şifrenizi hatırladınız mı ?<Link to="/"> Giriş Yapın</Link>
              </span>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;
