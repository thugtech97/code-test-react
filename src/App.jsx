import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchField from './components/SearchField';
import ScrollableList from './components/ScrollableList';

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const LIMIT = 10;

  const fetchLaunches = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.spacexdata.com/v3/launches?limit=${LIMIT}&offset=${offset}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setLaunches((prev) => [...prev, ...data]);
        setFilteredLaunches((prev) => [...prev, ...data]);
        setOffset((prevOffset) => prevOffset + LIMIT);
      }
    } catch (error) {
      console.error('Error fetching launches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredLaunches(launches); // Reset to full list if search is empty
    } else {
      const filtered = launches.filter((launch) =>
        launch.mission_name.toLowerCase().includes(value)
      );
      setFilteredLaunches(filtered);
    }
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">SpaceX Launches</h1>
      
      {/* Search Field */}
      <SearchField value={searchTerm} onChange={handleSearchChange} />
      
      {/* Display Number of Results */}
      <div className="mb-4">
        <strong>{filteredLaunches.length}</strong> result(s) found
      </div>
      
      {/* Scrollable List */}
      <ScrollableList
        items={filteredLaunches}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={fetchLaunches}
      />
    </div>
  );
};

export default App;
