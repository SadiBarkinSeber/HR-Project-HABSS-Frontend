import { useState } from "react";
import { Row, Col, Card, Form, Button, Image, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const isValidPassword = (value) => {
    // Şifrenin en az 6 karakter uzunluğunda olup olmadığını kontrol et
    if (value.length < 6) {
      return false;
    }

    // Şifrenin en az bir büyük harf, bir küçük harf ve bir rakam içerip içermediğini kontrol et
    const containsUpperCase = /[A-Z]/.test(value);
    const containsLowerCase = /[a-z]/.test(value);
    const containsNumber = /\d/.test(value);

    return containsUpperCase && containsLowerCase && containsNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermeli ve en az 6 karakter uzunluğunda olmalıdır."
      );
      return;
    }

    // Şifre yenileme işlemleri
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
                Şifrenizi yenilemek için aşağıdaki bilgileri doldurun.
              </p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  readOnly
                  placeholder="Email adresinizi giriniz"
                  value={"test@bilgeadamboost.com"}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Şifre</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Yeni şifrenizi giriniz"
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
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Şifre Tekrarı</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Yeni şifrenizi tekrar giriniz"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    variant="light"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "Gizle" : "Göster"}
                  </Button>
                </div>
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}
              <div>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Şifreyi Yenile
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

ResetPassword.Layout = AuthLayout;

export default ResetPassword;
