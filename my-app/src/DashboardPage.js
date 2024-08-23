import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { username } = state || {};

  useEffect(() => {
    if (username) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/users/?username=${username}`);
          if (response.ok) {
            const data = await response.json();
            setUserDetails(data);
          } else {
            setError('User details not found');
          }
        } catch (error) {
          setError('An error occurred while fetching user details');
        }
      };

      fetchUserDetails();
    } else {
      setError('No username provided');
    }
  }, [username]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userDetails ? (
        <div>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Age:</strong> {userDetails.age}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

const styles = {
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px"
  }
};

export default DashboardPage;
