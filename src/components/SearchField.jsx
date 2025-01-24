import React from 'react';


const SearchField = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control mb-4"
      placeholder="Search..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchField;
