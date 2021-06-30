import { components } from "react-select";

const Option = ({ children, ...props }) => {
  return <components.Option {...props}>{children}</components.Option>;
};

export default Option;
