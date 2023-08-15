import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import "./Login.css";
import {useNavigate} from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    Navigate("/home");
    console.log({ username, password });
  };

  return (
    <div className="login-container">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
