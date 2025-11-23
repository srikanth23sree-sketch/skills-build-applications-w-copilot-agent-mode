import React, { useEffect, useState } from 'react';

const API_URL = (() => {
  const name = process.env.REACT_APP_CODESPACE_NAME;
  return name
    ? `https://${name}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';
})();

export default function Users() {
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
        <h2 className="card-title mb-4 text-primary">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan="4" className="text-center">No users found.</td></tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.team}</td>
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
