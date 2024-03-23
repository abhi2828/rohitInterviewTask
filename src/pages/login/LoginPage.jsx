import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues: {
    name: '',
    password: ''
  }});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Generate random string for token
    const token = Math.random().toString(36).substring(7);
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    navigate('/home');
    onLogin()
  };

  if (isLoggedIn) {
    return <p>Welcome, you are now logged in!</p>;
  }

  return (
    <div className="container">
      <h2 className="text-center">Login</h2>

      <Row tag={Form} className="p-2 w-25 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <Col sm={12} display="flex" className="mb-1">
          <Label className="form-label" for="name">
            Name <span className="text-danger">*</span>
          </Label>
          <Controller
            id="name"
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Enter Name"
                maxLength="100"
                invalid={errors && errors.name ? true : false}
                {...field}
              />
            )}
          />
          {errors && errors.name && (
            <FormFeedback>{errors.name.message}</FormFeedback>
          )}
        </Col>
        <Col sm={12} display="flex" className="mb-1">
          <Label className="form-label" for="password">
            Password <span className="text-danger">*</span>
          </Label>
          <Controller
            id="password"
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                placeholder="Enter password"
                maxLength="16"
                invalid={errors && errors.password ? true : false}
                {...field}
              />
            )}
          />
          {errors && errors.password && (
            <FormFeedback>{errors.password.message}</FormFeedback>
          )}
        </Col>
        <Col xl={12} className="text-center mt-2 mb-1">
          <Button
            className="me-1"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </Col>
        <Col>
            <Link to={'/register'}>Register</Link>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
