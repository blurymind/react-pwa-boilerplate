import { createElement } from "react";

const CustomTag = ({ children, as = "div", ...props }: any) =>
  createElement(
    as,
    {
      ...props,
    },
    children
  );

export default CustomTag;
