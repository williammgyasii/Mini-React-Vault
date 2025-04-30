import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

type Props = {};

const RootLayout = (props: Props) => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
