import React, { useEffect, useRef } from 'react';

const ScrollableList = ({
  items,
  loading,
  hasMore,
  onLoadMore,
}) => {
  const listRef = useRef(null);

  const handleScroll = () => {
    const container = listRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        onLoadMore();
      }
    }
  };

  useEffect(() => {
    const container = listRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [items]);

  return (
    <div
      ref={listRef}
      className="scrollable-list"
      style={{
        height: '70vh',
        overflowY: 'auto',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    >
      {items.map((item) => (
        <div key={item.flight_number} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{item.mission_name}</h5>
            <p className="card-text">
              <strong>Launch Year:</strong> {item.launch_year}
            </p>
            <p className="card-text">
              <strong>Rocket Name:</strong> {item.rocket.rocket_name}
            </p>
            <p className="card-text">
              <strong>Details:</strong> {item.details || 'No details available.'}
            </p>
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!hasMore && !loading && (
        <p className="text-center text-muted">No more launches to display.</p>
      )}
    </div>
  );
};

export default ScrollableList;
