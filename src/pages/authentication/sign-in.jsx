import { useState } from "react";
import { Row, Col, Card, Form, Button, Image, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginCheck } from "../api/api";
import { useAuth } from "../../components/TokenContext";
import AuthLayout from "../../layouts/AuthLayout";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const [email, setEmail] = useState("");
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
    if (!email || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Geçerli bir Bilge Adam Boost email adresi girin.");
      return;
    }
    try {
      const response = await LoginCheck(email, password);
      console.log(response.status);
      if (response.status === 200) {
        if (response.data === "Password change.") {
          navigateTo(`/resetpassword?email=${email}`);
          return;
        }
        // navigateTo("/emp");
        const jwtoken = response.data;
        console.log(jwtoken);
        setAuthToken(jwtoken);

        const decodedToken = jwtDecode(jwtoken);
        const userRole = decodedToken.role;
        const userIdString = decodedToken.nameid;
        const userId = userIdString ? parseInt(userIdString) : null;
        console.log(userRole, typeof userId);

        // Kullanıcının rolüne göre yönlendirme yap
        if (userRole === "siteManager") {
          navigateTo(`/admin`, { state: { id: userId } });
        } else if (userRole === "manager") {
          navigateTo(`/mng`, { state: { id: userId } });
        } else {
          navigateTo(`/emp`, { state: { id: userId } });
        }
      } else {
        setError("Mail adresi veya şifre yanlış. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Giriş yapılırken bir hata oluştu:", error);
      setError("Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.");
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
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email adresinizi giriniz"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
