import { useState } from "react";
import { useAuth } from "../context/authContext";
import "./Login.css";

const Login = () => {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      if (!username.trim() || !email.trim() || !password.trim()) {
        setError("All fields are required for registration.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      const result = await register({
        username: username.trim(),
        email: email.trim(),
        password,
      });

      if (!result.success) {
        setError(result.message || "Registration failed.");
      } else {
        alert("Registration successful!");
        setIsRegistering(false);
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setError("Please enter email and password.");
        return;
      }
      const result = await login({
        email: email.trim(),
        password,
      });
      if (!result.success) {
        setError(result.message || "Invalid credentials.");
      }
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegistering ? "Create Account" : "Welcome Back!"}</h2>
        <p>
          {isRegistering
            ? "Sign up to start organizing your tasks."
            : "Please sign in to continue."}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder={
                isRegistering ? "Create a password" : "Enter your password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isRegistering ? "new-password" : "current-password"}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">
            {isRegistering ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="toggle-form-text">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <button onClick={toggleForm} className="toggle-form-btn">
            {isRegistering ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
