import React from "react";
import Sidebar from "./sidebar";
import { SLayout, SMain } from "./layoutstyles";

const Layout = ({ children }) => {
  return (
    <SLayout>
      <Sidebar />
      <SMain>{children}</SMain>
    </SLayout>
  );
};

export default Layout;
