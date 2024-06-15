import React from "react";
import Navbar from "../component/Navbar/Navbar";
import Main from "../component/Main/Main";
import style from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Main>{children}</Main>
    </div>
  );
}

export default Layout;
