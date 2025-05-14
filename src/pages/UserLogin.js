import React, { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import useFetchFromSheet from "../components/hooks/useFetchFromSheet";

const UserLogin = () => {
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authenticate } = useFetchFromSheet();

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const requestOptions = { ...loginData };

    try {
      const response = await authenticate(requestOptions);
      if (response?.status !== "success") {
        throw new Error(response?.message || "Unknown error fetching data");
      }
      const userData = response.data;
      signIn({
        auth: {
          token: userData.token,
          type: "Bearer",
        },
        refresh: userData.refreshToken,
        userState: {
          name: userData.name,
          id: userData.id,
          email: userData.email,
          role: userData.role,
        },
      });
      navigate(userData.role === "user" ? "/" : "/admin-dashboard");
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>WELCOME!</h1>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="input-group">
          <label htmlFor="memberId">Member ID</label>
          <input
            type="text"
            name="memberId"
            placeholder="E.g., NEON/XXX"
            onChange={handleChange}
            required
          />
          <span className="error-message"></span>
          <br />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          <span className="error-message"></span>
          <br />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
