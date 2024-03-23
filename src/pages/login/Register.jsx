import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { commonAPICall } from '../../utilities';
import { useEffect, useMemo, useState } from 'react';

const Register = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      countryId: '',
      stateId: '',
      cityId: '',
      departmentName: '',
      designationName: '',
      gender: 'male',
      date_of_joining: new Date().toISOString().substr(0, 10),
    },
  });
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true);
      const countries = await commonAPICall('country', 'get');
      setCountry(countries);
      setLoading(false);
    };
    fetchCountryData();
  }, []);

  useEffect(() => {
    const fetchStateData = async () => {
      if (selectedCountry) {
        setLoading(true);
        const states = await commonAPICall(`country`,{name:selectedCountry}, 'post');
        setState(states);
        setLoading(false);
      }
      if (selectedState) {
        setLoading(true);
        const states = await commonAPICall(`state`,{name:selectedState}, 'post');
        setState(states);
        setLoading(false);
      }
    };
    fetchStateData();
  }, [selectedCountry,selectedState]);

  const memoizedCountry = useMemo(() => country, [country]);
  const memoizedState = useMemo(() => state, [state]);
  const memoizedCity = useMemo(() => city, [city]);

  const onSubmit = async (data) => {
    await commonAPICall('register', data, 'post');
    navigate('/');
  };

  console.log('memoizedState', memoizedState)

  return (
    <div className="container">
      <h2 className="text-center">Register</h2>
      <Form autoComplete="off" className="p-2 w-50 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6} className="mb-1">
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </Col>
          <Col md={6} className="mb-1">
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } }}
              render={({ field }) => <Input type="email" {...field} />}
            />
            {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-1">
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } }}
              render={({ field }) => <Input type="password" {...field} />}
            />
            {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
          </Col>
          <Col md={4} className="mb-1">
            <Label htmlFor="gender">Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Input type="select" {...field}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              )}
            />
          </Col>
          <Col md={4} className="mb-1">
            <Label htmlFor="date_of_joining">Date of Joining</Label>
            <Controller
              name="date_of_joining"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-1">
            <Label htmlFor="departmentName">Department Name</Label>
            <Controller
              name="departmentName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Col>
          <Col md={4} className="mb-1">
            <Label htmlFor="designationName">Designation Name</Label>
            <Controller
              name="designationName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-1">
            <Label htmlFor="countryId">Country</Label>
            <Controller
              name="countryId"
              control={control}
              render={({ field }) => (
                <Input type="select" value={selectedCountry} {...field} onChange={(e) => setSelectedCountry(e.target.value)}>
                  <option value="">Select Country</option>
                  {loading ? <option>Loading...</option> : memoizedCountry?.map(({ id, name }) => (
                    <option key={id} value={name}>{name}</option>
                  ))}
                </Input>
              )}
            />
          </Col>
          <Col md={4} className="mb-1">
            <Label htmlFor="stateId">State</Label>
            <Controller
              name="stateId"
              control={control}
              render={({ field }) => (
                <Input type="select" {...field} onChange={(e) => setSelectedCountry(e.target.value)}>
                  <option value="">Select State</option>
                  {memoizedState[0]?.state?.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </Input>
              )}
            />
          </Col>
          <Col md={4} className="mb-1">
            <Label htmlFor="cityId">City</Label>
            <Controller
              name="cityId"
              control={control}
              render={({ field }) => (
                <Input type="select" {...field}>
                  <option value="">Select City</option>
                  {memoizedCity?.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </Input>
              )}
            />
          </Col>
        </Row>
        <Button color="primary" type="submit">Register</Button>
      </Form>
      <p className="mt-3">Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Register;
