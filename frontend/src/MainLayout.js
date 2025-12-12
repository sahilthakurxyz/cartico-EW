import React, { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/Footer.js";
import NavMenu from "./components/layout/Header/NavMenu.js";

const MainLayout = ({ children }) => {
  return (
    <>
      <span id="navmenu_mainContainer"></span>

      <NavMenu />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
