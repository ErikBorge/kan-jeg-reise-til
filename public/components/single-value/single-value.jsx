import { useState, useEffect } from "react";
import { components } from "react-select";

const SingleValue = ({ children, ...props }) => {
  const [result, setResult] = useState("");
  useEffect(() => {
    if (children && children.includes("?")) {
      setResult(children.replace("?", ""));
    }
  }, [children]);

  return <components.SingleValue {...props}>{result}</components.SingleValue>;
};

export default SingleValue;
