import { Category } from "@mui/icons-material";
import React from "react";
import Categories from "../categories/categories";
import "./display_content_Section.css";
import Categories2 from "../categories/categories2";

function Display_Data_section() {
  return (
    <div className="categories123-container">
      <Categories />
      <Categories2 />
    </div>
  );
}

export default Display_Data_section;
