import { useState } from "react";
import { Row, Col, Card, Form, Button, Image, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginCheck } from "../api/api";
import { useAuth } from "../../components/TokenContext";
import AuthLayout from "../../layouts/AuthLayout";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigateTo = useNavigate();
  const { token, setAuthToken } = useAuth();

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@bilgeadamboost\.com$/;
    return emailRegex.test(value);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    // if (!isValidEmail(username)) {
    //   setError("Geçerli bir Bilge Adam Boost email adresi girin.");
    //   return;
    // }
    try {
      const response = await LoginCheck(username, password);
      console.log(response.status);
      if (response.status === 200) {
        navigateTo("/emp");
        const jwtoken = response.data;
        console.log(jwtoken);
        setAuthToken(jwtoken);
      } else {
        setError("Kullanıcı adı veya şifre yanlış. Lütfen tekrar deneyin.");
      }
    } catch (error) {
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
              <p className="mb-6">Lütfen bilgilerinizi eksiksiz giriniz</p>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="username"
                  placeholder="Email adresinizi giriniz"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Şifre</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="**************"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="light"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Gizle" : "Göster"}
                  </Button>
                </div>
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}
              <div>
                <div className="d-grid">
                  <Button variant="primary" onClick={handleLogin}>
                    Giriş Yap
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div>
                    <Link to="/forgetpassword" className="text-inherit fs-5">
                      Şifremi Unuttum
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
