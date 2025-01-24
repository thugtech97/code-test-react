import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import SearchField from './components/SearchField';
import ScrollableList from './components/ScrollableList';
import { fetchTotalLaunches, fetchLaunches } from './api';

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalLaunches, setTotalLaunches] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const LIMIT = 10;

  const getTotalLaunches = async () => {
    const total = await fetchTotalLaunches();
    setTotalLaunches(total);
  };

  const getLaunches = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const data = await fetchLaunches(LIMIT, offset);

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setLaunches((prev) => [...prev, ...data]);
      setOffset((prevOffset) => prevOffset + LIMIT);
    }

    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const filterLaunches = (term) => {
      if (term === '') {
        setFilteredLaunches(launches);
      } else {
        const filtered = launches.filter((launch) =>
          launch.mission_name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredLaunches(filtered);
      }
    };

    filterLaunches(debouncedSearchTerm);
  }, [debouncedSearchTerm, launches]);

  useEffect(() => {
    getTotalLaunches();
    getLaunches();
  }, []);

  const handleReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="d-flex" style={{ height: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <div
          className="sidebar"
          style={{
            width: isSidebarCollapsed ? '0' : '250px',
            backgroundColor: '#343a40',
            color: 'white',
            padding: isSidebarCollapsed ? '0' : '20px',
            height: '100%',
            boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
            transition: 'width 0.3s, padding 0.3s',
            overflow: 'hidden',
          }}
        >
          <h4 className="text-center text-white">SpaceX Launches</h4>
          <ul className="list-unstyled">
            <li>
              <NavLink
                to="/"
                className="text-white text-decoration-none d-block py-2 px-3"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#007bff' : 'transparent',
                  borderRadius: '5px',
                })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="text-white text-decoration-none d-block py-2 px-3"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#007bff' : 'transparent',
                  borderRadius: '5px',
                })}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content" style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
          <header
            className="mb-4"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
            }}
          >
            <h1 className="text-center">SpaceX Launches</h1>
          </header>

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                  <div className="mb-4 d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{totalLaunches}</strong> total record(s) available
                    </div>
                    <div>
                      <button className="btn btn-danger" onClick={handleReset}>
                        Reset
                      </button>
                    </div>
                  </div>

                  <ScrollableList
                    items={filteredLaunches}
                    loading={loading}
                    hasMore={hasMore}
                    onLoadMore={getLaunches}
                  />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <div className="text-center">
                  <h2>About SpaceX Launches</h2>
                  <p>Endpoint used: <a href='#'>https://api.spacexdata.com/v3/launches.</a></p>
                  <p>Developed by: <a href='https://github.com/thugtech97' target='_blank'>https://github.com/thugtech97.</a></p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
