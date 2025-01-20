import React, { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    formData.append("requestType", "authenticate");

    const baseUrl =
      "https://script.google.com/macros/s/AKfycbwVJ4S8n_8_Fx49sWYydwSDI94h4yhUiw4gCHeXU6_OwrLCUAmkbs3Y9ihGpv8GugzKGA/exec";
    const params = new URLSearchParams(formData);
    const url = `${baseUrl}?${params.toString()}`;
    console.log(url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
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
          },
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Welcome!</h1>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="input-group">
          <label htmlFor="memberId">Member ID</label>
          <input
            type="text"
            name="memberId"
            placeholder="E.g., NEON/XXX"
            required
          />
          <span className="error-message"></span>
          <br />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
          <span className="error-message"></span>
          <br />
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default UserLogin;
