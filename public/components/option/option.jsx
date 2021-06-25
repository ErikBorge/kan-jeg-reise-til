import { components } from "react-select";

const Option = ({ children, ...props }) => {
  //   console.log("Option props", props);

  //   if (props.selectProps.inputValue.length >= 3) {
  //     // console.log("Option props.value", props.value);
  //     props.selectProps.selectProps.setCurrentSuggestion(props.label);
  //   } else {
  //     props.selectProps.selectProps.setCurrentSuggestion(false);
  //   }

  return <components.Option {...props}>{children}</components.Option>;
};

export default Option;
