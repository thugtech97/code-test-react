import React from 'react';

const SearchField = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control mb-4"
      placeholder="Search by mission name..."
      value={value}
      onChange={onChange}  // Propagate the change to parent component
    />
  );
};

export default SearchField;
