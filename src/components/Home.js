import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
 
  

 

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="text-center">
        <h1 className="mb-4">User Management App</h1>
        <Link to="/login" className="btn btn-primary">
          Click to continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
