import React, { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  // const [id, setId] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const { id, password } = e.target;

    fetch(
      "https://script.google.com/macros/s/AKfycbxVP6Cy7FlQCSbZYDSG9-TNWAZFBKwjlsoBAZ7EunMOW1NLJhZ9re1nilQAa794djHH/exec?memberId=" +
        encodeURIComponent(id.value) +
        "&password=" +
        encodeURIComponent(password.value)
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
        console.log(userData);
        signIn({
          auth: {
            token: userData.token,
            type: "Bearer",
          },
          refresh: userData.refreshToken,
          userState: userData.email,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <h1>Welcome back!</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="id">Member ID</label>
          <input
            type="text"
            name="id"
            // value={id}
            // onChange={(e) => setId(e.target.value)}
            placeholder="E.g., NEON/XXX"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
