import React, { Fragment } from "react";
import { Navigation } from "./Navigation";

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navigation />
      {children}
    </Fragment>
  );
};
