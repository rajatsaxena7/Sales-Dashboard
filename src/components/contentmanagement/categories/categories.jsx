import React from "react";
import "./categories.css";
import CategoryLabel from "./categorylabel/categorylabel.jsx";

function Categories() {
  return (
    <div className="Category-Container">
      <h2>Categories</h2>

      <CategoryLabel />
    </div>
  );
}

export default Categories;
