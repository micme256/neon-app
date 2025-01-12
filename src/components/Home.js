// import React, { useState } from "react";
import Header from "./Header";
import useSignOut from "react-auth-kit/hooks/useSignOut";
// import DataElement from "./DataElement";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      signOut();
      navigate("/userlogin");
    }
  };
  // const [data, setData] = useState({});

  return (
    <>
      <Header />
      {/* {data && <DataElement data={data} />} */}
      <button onClick={handleSignOut}>SING OUT</button>
    </>
  );
};

export default Home;
