import { Row, Col, Card, Form, Button, Image, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCheck } from "../api/api";
import { useAuth } from "../../components/TokenContext";
import AuthLayout from "../../layouts/AuthLayout";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();
  const { token, setAuthToken } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await LoginCheck(username, password);
      if (response.status === 200) {
        navigateTo("/emp");
        const jwtoken=response.data;
        console.log(jwtoken);
       setAuthToken(jwtoken);
      } else {
        setError("Hatalı kullanıcı adı veya parola. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <Row
      className="align-items-center justify-content-center g-0 min-vh-100"
      style={{
        backgroundImage: `url('../../../dist/images/background/login-background.jpg')`,
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
              <p className="mb-6">Please enter your user information.</p>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username or email</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter address here"
                  required=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="**************"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" id="rememberme">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>Remember me</Form.Check.Label>
                </Form.Check>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <div>
                <div className="d-grid">
                  <Button variant="primary" onClick={handleLogin}>
                    Sign In
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div>
                    <Link
                      to="/authentication/forget-password"
                      className="text-inherit fs-5"
                    >
                      Forgot your password?
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
