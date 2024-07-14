import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/Register.css'; // Import custom CSS for additional styles
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = (values, { setSubmitting }) => {
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
      setSubmitting(false);
      return;
    }
    dispatch(register(values));
    navigate('/');
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
            <h2 className="mb-4">Register</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group position-relative mb-3">
              <label htmlFor="password">Password</label>
              <Field  
                type={showPassword ? "text" : "password"}
                className="form-control mt-1"
                id="password"
                name="password"
                placeholder="Enter password"
              />
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`}
                onClick={() => setShowPassword(!showPassword)}
              />
              <ErrorMessage name="password" component="div" className="text-danger err-msg" />
            </div>
            <div className="form-group position-relative mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type={showConfirmPassword ? "text" : "password"}
                className="form-control mt-1"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
              />
              <i
                className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger err-msg" />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
            <p className='mt-2'>Already have an account ?<Link to='/'>Click Here</Link></p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
