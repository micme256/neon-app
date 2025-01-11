import React from "react";

const Admin = () => {
  return (
    <>
      <h1>Welcome back!</h1>
      <form>
        <label htmlFor="id">Admin ID</label>
        <input type="text" name="id" placeholder="E.g., NEON/XXX" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
};

export default Admin;
