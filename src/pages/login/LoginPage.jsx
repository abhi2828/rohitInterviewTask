import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const {
    reset,
    control,
    setError,
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.authSlice);

  const onSubmit = async (params) => {
    console.log('params', params)
    const resultAction = await dispatch(login(params));
    if (login.fulfilled.match(resultAction)) {
      debugger
      const token = resultAction.payload.token;
      localStorage.setItem('token', token); // Store token in local storage
     await navigate('/home'); // Navigate to '/home'
     console.log('first')
    }
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
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner text="Loading..." color="white" size="sm" />
      ) : (
        'Submit'
      )}
    </Button>
  </Col>
</Row>

    </div>
  );
};

export default LoginPage;
