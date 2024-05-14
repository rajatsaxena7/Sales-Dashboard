import React from "react";
import "./todoaction.css";
import AddCategory from "./Addcategory/addCategory";
import AddProducts from "./Addproducts/addProducts";
import ManagePortfolio from "./Manageportfolio/managePortfolio";
import SendNotification from "./SendNotification/sendNotification";

function TodoAction() {
  return (
    <div className="MainTodoaction">
      Manage Content
      <div>
        <AddCategory />
      </div>
      <div>
        <AddProducts />
      </div>
      <div>
        <ManagePortfolio />
      </div>
      <div>
        <SendNotification />
      </div>
    </div>
  );
}

export default TodoAction;
