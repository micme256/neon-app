import React, { useState } from "react";
import Profileimg from "./Header comps/Profileimg";

const Header = () => {
  const [src, setSrc] = useState("");
  const user = JSON.parse(localStorage.getItem("_auth_state"));
  return (
    <div className="header">
      <h1 className="logo">NEON LOGO</h1>
      <div>
        <div className="fname">{user.name}</div>
        <div className="mId">{user.id}</div>
      </div>
      <Profileimg imgsrc={src} />
    </div>
  );
};

export default Header;
