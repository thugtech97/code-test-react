import React, { useState, useEffect, useRef } from 'react';
import { timeAgo } from '../helper';

const ScrollableList = ({ items, loading, hasMore, onLoadMore }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [imgError, setImgError] = useState(false);
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

  const handleViewClick = (index) => {
    setExpandedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const getStatusBadge = (launchSuccess, upcoming) => {
    if (upcoming) {
      return <span className="badge bg-warning text-dark">Upcoming</span>;
    } else if (launchSuccess) {
      return <span className="badge bg-success">Success</span>;
    } else {
      return <span className="badge bg-danger">Failed</span>;
    }
  };

  const fallbackImage = "https://static.vecteezy.com/system/resources/previews/004/639/366/non_2x/error-404-not-found-text-design-vector.jpg";

  return (
    <div
      ref={listRef}
      className="scrollable-list"
      style={{
        height: '60vh',
        overflowY: 'auto',
        padding: '10px',
        borderRadius: '5px',
        scrollbarWidth: 'thin', 
        WebkitOverflowScrolling: 'touch', 
      }}
    >
      {items.map((item, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {item.mission_name} {getStatusBadge(item.launch_success, item.upcoming)}
            </h5>

            <div
              className={`mt-3 mb-3 fade ${expandedItems.includes(index) ? 'show' : ''}`}
              style={{ display: expandedItems.includes(index) ? 'block' : 'none' }}
            >
              <div className="d-flex justify-content-between mb-3">
                <p className="card-text">
                  {timeAgo(item.launch_date_local)} |&nbsp;
                  {item.links.article_link && (
                    <>
                      <a href={item.links.article_link} target="_blank" rel="noopener noreferrer">Read Article</a> |&nbsp;
                    </>
                  )}
                  {item.links.wikipedia && (
                    <>
                      <a href={item.links.wikipedia} target="_blank" rel="noopener noreferrer">View Wikipedia</a> |&nbsp;
                    </>
                  )}
                  {item.links.video_link && (
                    <>
                      <a href={item.links.video_link} target="_blank" rel="noopener noreferrer">Watch Video</a>
                    </>
                  )}
                </p>
              </div>

              <div className="d-flex">
                <div className="me-3">
                  <img
                    src={imgError ? fallbackImage : item.links.video_link}
                    alt="Mission Image"
                    className="img-fluid"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                    onError={() => setImgError(true)}
                  />
                </div>
                <div>
                  <p className="card-text">
                    <strong>Rocket Name:</strong> {item.rocket.rocket_name}
                  </p>
                  <p className="card-text">
                    {item.details || 'No details available.'}
                  </p>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleViewClick(index)}
            >
              {expandedItems.includes(index) ? 'Hide' : 'View'}
            </button>
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
        <p className="text-center text-muted">End of list.</p>
      )}
    </div>
  );
};

export default ScrollableList;
