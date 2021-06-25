import Image from "next/image";
import { components } from "react-select";

const Control = ({ children, ...props }) => {
  return (
    <components.Control {...props}>
      {children}
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
    </components.Control>
  );
};

export default Control;
