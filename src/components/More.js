import React from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const More = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      signOut();
      navigate("/userlogin");
    }
  };
  return (
    <>
      <button onClick={handleSignOut}>SING OUT</button>
      <Nav />
    </>
  );
};

export default More;
