import React, { useEffect, useState } from 'react';

const API_URL = (() => {
  const name = process.env.REACT_APP_CODESPACE_NAME;
  return name
    ? `https://${name}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';
})();

export default function Activities() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
      });
  }, []);
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Activity</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan="4" className="text-center">No activities found.</td></tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.user}</td>
                    <td>{item.activity}</td>
                    <td>{item.distance}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
