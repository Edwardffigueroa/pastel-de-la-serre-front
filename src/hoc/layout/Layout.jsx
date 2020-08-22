import React, { useState } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import DotNav from "../../components/Navigation/DotNav/DotNav";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => setShowSideDrawer(false);
  const sideDrawerToggleHandler = () => setShowSideDrawer((prev) => !prev);

  return (
    <div>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} /> <DotNav />{" "}
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />{" "}
      <main className={classes.Content}> {props.children} </main>{" "}
    </div>
  );
};

export default Layout;
