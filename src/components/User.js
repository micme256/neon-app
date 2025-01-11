import React from "react";

const User = () => {
  const handleLogin = (e) => {
    e.preventDefault();
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Welcome back!</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="id">Member ID</label>
        <input type="text" name="id" placeholder="E.g., NEON/XXX" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
};

export default User;
