import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      login(userData); // Set user data in AuthContext

      // Navigate to the dashboard and pass user details as state
      navigate('/dashboard', { state: { username: userData.username } });
    } else {
      alert('Invalid username or password');
    }
  };
  const handleLogout = () => {
    // Clear user data (if stored in state or context)
    // Navigate to the login page
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}style={styles.button}>Login</button>

      <button onClick={handleLogout} style={styles.button}>
            Register
          </button>
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



export default LoginPage;
