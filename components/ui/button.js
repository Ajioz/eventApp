import Link from "next/link";
import React from "react";

const Button = (props) => {
  return <Link href={props.link}>{props.children}</Link>;
};

export default Button;
