import React from "react";
import "./maincontent.css";
import Cards1 from "../cards/cards";
import Cards2 from "../cards/cards2";
import Cards3 from "../cards/cards3";
import Graph1 from "../section2/section2MainGraph2";

function Maincontent() {
  return (
    <div>
      <div className="Container">
        <Cards1 />
        <Cards3 />
        <Cards2 />
      </div>
      <Graph1 />
    </div>
  );
}

export default Maincontent;
