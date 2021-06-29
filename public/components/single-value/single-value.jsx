import { useState, useEffect } from "react";
import { components } from "react-select";

const SingleValue = ({ children, ...props }) => {
  const [result, setResult] = useState("");
  console.log("props", props);
  console.log("children", children);
  useEffect(() => {
    if (children && children.includes("?")) {
      setResult(children.replace("?", ""));
    }
  }, [children]);

  return <components.SingleValue {...props}>{result}</components.SingleValue>;
};

export default SingleValue;
