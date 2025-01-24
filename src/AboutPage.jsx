import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="card p-4">
      <h2 className="card-title text-center">This is the About Page</h2>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/">
          <button className="btn btn-secondary">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
