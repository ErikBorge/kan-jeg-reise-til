import Image from "next/image";
import { components } from "react-select";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Control = ({ children, ...props }) => {
  // console.log(props);
  // console.log("props.getValue", props.getValue());

  // const [restOfSuggestion, setRestOfSuggestion] = useState(false);
  // useEffect(() => {
  //   if (props.selectProps.selectProps.currentSuggestion) {
  //     // console.log("props.selectProps.inputValue", props.selectProps.inputValue);
  //     // console.log(
  //     //   "currentSuggestion",
  //     //   props.selectProps.selectProps.currentSuggestion
  //     // );
  //     let restString = props.selectProps.selectProps.currentSuggestion
  //       .toLowerCase()
  //       .split(props.selectProps.inputValue.toLowerCase())[1];
  //     // console.log("restString", restString);
  //     setRestOfSuggestion(restString);
  //     // setRestOfSuggestion()
  //   } else {
  //     setRestOfSuggestion(false);
  //   }
  // }, [
  //   props.selectProps.selectProps.currentSuggestion,
  //   props.selectProps.inputValue,
  // ]);
  // console.log("restOfSuggestion", restOfSuggestion);
  return (
    <components.Control {...props}>
      {children}
      {/* {restOfSuggestion && restOfSuggestion} */}
      {props.selectProps.selectProps.chosenCountry && (
        <div
          style={{
            fontSize: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: "60px",
          }}
        >
          <Image
            src={"/assets/cross-pixel.svg"}
            alt="x"
            height={18}
            width={18}
          />
        </div>
      )}
      {/* <components.Option {...props}>{children}</components.Option> */}
    </components.Control>
  );
};

export default Control;
