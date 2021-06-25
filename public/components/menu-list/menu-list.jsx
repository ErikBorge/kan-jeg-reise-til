import { components } from "react-select";

const MenuList = ({ children, ...props }) => {
  console.log(props);
  if (props.selectProps.inputValue.length >= 3) {
    return (
      <components.MenuList {...props}>
        {
          Array.isArray(children)
            ? children.slice(0, props.selectProps?.maxOptions) /* Options */
            : children /* NoOptionsLabel */
        }
      </components.MenuList>
    );
  } else {
    return null;
  }
};
export default MenuList;
