import React from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Register = ({ onRegister }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues: {
    name: '',
    email:"",
    password: ''
  }});
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const existingData = JSON.parse(localStorage.getItem('register_users')) || [];
    const updatedData = [...existingData, data];
    localStorage.setItem('register_users', JSON.stringify(updatedData));
    navigate('/');
  };


  

  return (
    <div className="container">
      <h2 className="text-center">Register</h2>

      <Row tag={Form} autoComplete="off" className="p-2 w-25 m-auto" onSubmit={handleSubmit(onSubmit)}>
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
          <Label className="form-label" for="email">
            Email <span className="text-danger">*</span>
          </Label>
          <Controller
            id="email"
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                placeholder="Enter Email"
                maxLength="100"
                invalid={errors && errors.email ? true : false}
                {...field}
              />
            )}
          />
          {errors && errors.email && (
            <FormFeedback>{errors.email.message}</FormFeedback>
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
            Register
          </Button>
        </Col>
        <Col>
          <Link to={'/'}>Login</Link>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
