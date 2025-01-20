import { useState } from "react";
import Admin from "./login-forms/Admin";
import User from "./login-forms/User";

const handleLogin = async (e) => {
  e.preventDefault();
  const { id, password } = e.target;

  try {
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbyn8KcNAhPCAbxsoMG7y9WZF_-TUwtEhLRFDUjDwKJxj-O3m1hLFHoIJSnvPfYLR3Ewbw/exec?memberId=${id.value}&password=${password.value}`,
      { mode: "cors" }
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    let userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

const Login = () => {
  const [role, setRole] = useState(null);
  return (
    <>
      {role === null && (
        <div>
          <h1>Welcome, Please select either user or admin</h1>
          <button onClick={() => setRole("admin")}>ADMIN</button>
          <button onClick={() => setRole("user")}>USER</button>
        </div>
      )}
      {role !== null && (role === "admin" ? <Admin /> : <User />)}
    </>
  );
};

export default Login;
