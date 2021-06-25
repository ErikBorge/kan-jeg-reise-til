import Image from "next/image";
import { components } from "react-select";
import { useState, useEffect } from "react";

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
      <div
        style={{
          marginRight: "10px",
          fontSize: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.selectProps.selectProps.chosenCountry ? (
          <div style={{ marginBottom: "10px" }}>
            <Image
              src={"/assets/cross-pixel.svg"}
              alt="x"
              height={18}
              width={18}
            />
          </div>
        ) : (
          "?"
        )}
      </div>
      {/* <components.Option {...props}>{children}</components.Option> */}
    </components.Control>
  );
};

export default Control;
