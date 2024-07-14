import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const { token } = useParams();
  const dispatch = useDispatch();
  const resetPasswordStatus = useSelector((state) => state.auth.resetPasswordStatus);

  const { password, confirmPassword } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(resetPassword({ password, token }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="p-4 rounded bg-secondary">
        <h2 className="mb-4">Reset Password</h2>
        {resetPasswordStatus ? (
          <div className={`alert ${resetPasswordStatus === 'Password reset successfully' ? 'alert-success' : 'alert-danger'}`} role="alert">
            {resetPasswordStatus}
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
