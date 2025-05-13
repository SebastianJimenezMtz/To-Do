import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Added for registration
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (isRegistering) {
      if (!username.trim() || !email.trim() || !password) {
        setError('All fields are required for registration.');
        return;
      }
      // Basic email validation
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }
      onRegister({ username: username.trim(), email: email.trim(), password });
    } else {
      if (!username.trim() || !password) {
        setError('Please enter username and password.');
        return;
      }
      onLogin({ username: username.trim(), password });
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegistering ? 'Create Account' : 'Welcome Back!'}</h2>
        <p>{isRegistering ? 'Sign up to start organizing your tasks.' : 'Please sign in to continue.'}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>
          {isRegistering && (
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegistering ? 'Create a password' : 'Enter your password'}
              autoComplete={isRegistering ? "new-password" : "current-password"}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="toggle-form-text">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={toggleForm} className="toggle-form-btn">
            {isRegistering ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
