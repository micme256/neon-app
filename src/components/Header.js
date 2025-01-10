import React, { useState } from "react";
import Profileimg from "./Header comps/Profileimg";

const Header = ({ fname = "MICHEAL", mID = "NEON256" }) => {
  const [src, setSrc] = useState("");
  return (
    <div className="header">
      <h1 className="logo">NEON LOGO</h1>
      <div>
        <div className="fname">{fname}</div>
        <div className="mId">{mID}</div>
      </div>
      <Profileimg imgsrc={src} />
    </div>
  );
};

export default Header;
