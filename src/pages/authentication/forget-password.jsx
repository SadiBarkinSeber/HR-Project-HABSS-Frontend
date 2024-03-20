// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

const ForgetPassword = () => {
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100"
      style={{
        backgroundImage: `url('../../../dist/images/background/login-background6.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="../../../dist/images/brand/logo/habss-logo-small1.png"
                  className="mb-2"
                  alt=""
                />
              </Link>
              <p className="mb-6">
                Endişelenmeyin, şifrenizi sıfırlamanız için size bir e-posta göndereceğiz.
              </p>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email adresinizi giriniz"
                />
              </Form.Group>
              {/* Button */}
              <div className="mb-3 d-grid">
                <Button variant="primary" type="submit">
                  Şifreyi Sıfırla
                </Button>
              </div>
              <span>
                Hesabın yok mu ? Hemen oluştur.{" "}
                <Link to="/">Giriş Yap</Link>
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
