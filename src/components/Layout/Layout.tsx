import React from "react";
import s from "./Layout.module.scss";

const Layout: React.FunctionComponent = ({ children }) => (
  <div className={s["layout"]}>
    {children}
  </div>
);

export default Layout;
