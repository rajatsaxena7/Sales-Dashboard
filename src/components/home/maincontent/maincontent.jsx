import React from "react";
import "./maincontent.css";
import Cards1 from "../cards/cards";
import Cards2 from "../cards/cards2";
import Cards3 from "../cards/cards3";

function Maincontent() {
  return (
    <div>
      <div className="Container">
        <Cards1 />
        <Cards2 />
        <Cards3 />
      </div>
    </div>
  );
}

export default Maincontent;
