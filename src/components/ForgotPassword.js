import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordResetEmail } from '../features/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const passwordResetEmailStatus = useSelector((state) => state.auth.passwordResetEmailStatus);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="p-4 rounded bg-secondary">
        <h2 className="mb-4">Forgot Password</h2>
        {passwordResetEmailStatus ? (
          <div className={`alert ${passwordResetEmailStatus === 'Mail sent successfully' ? 'alert-success' : 'alert-danger'}`} role="alert">
            {passwordResetEmailStatus}
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Send Password Reset Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
