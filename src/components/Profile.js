import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, updateProfile, logout } from '../features/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    } else {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user, dispatch]);

  const { username, email } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setIsEditing(false); // Disable editing mode after submission
  };

  const onLogout = () => {
    dispatch(logout());
    navigate('/'); // Navigate to home page after logout
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="p-4 rounded bg-secondary">
        <h2 className="mb-4">My Profile</h2>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <div className="mb-3">
              <strong>Username:</strong> {user.username}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {user.email}
            </div>
          </>
        ) : (
          <p>No user data found.</p>
        )}
        <hr />
        {isEditing ? (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Save Changes
            </button>
          </form>
        ) : (
          <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
        <hr />
        <button className="btn btn-danger mt-4" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
