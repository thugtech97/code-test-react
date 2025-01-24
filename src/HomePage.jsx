import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="card p-4">
      <h2 className="card-title text-center">Welcome to the Home Page</h2>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/about">
          <button className="btn btn-primary">Go to About Page</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
