import React from "react";

const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main> 
    </>
  );
};

export default Layout;
