import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/Login.css'; // Import custom CSS for additional styles
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const resultAction = await dispatch(login(values));
      if (login.fulfilled.match(resultAction)) {
        navigate('/profile');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="p-4 rounded bg-secondary">
            <h4 className="mb-4">Welcome !! Please Login to Continue</h4>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                className="form-control mt-1"
                id="email"
                name="email"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group position-relative mb-3">
              <label htmlFor="password">Password</label>
              <Field
                type={showPassword ? 'text' : 'password'}
                className="form-control mt-1"
                id="password"
                name="password"
                placeholder="Enter password"
              />
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`}
                onClick={() => setShowPassword(!showPassword)}
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <div className="mt-2">
              <Link to="/forgot-password" className="text-warning">
                Forgot Password?
              </Link>
            </div>
            <p className="mt-1">
              Don't have an account? <Link to="/register">Click Here</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
