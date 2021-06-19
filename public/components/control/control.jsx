import Image from "next/image";
import { components } from "react-select";

const Control = ({ children, ...props }) => {
  return (
    <components.Control {...props}>
      <div style={{ marginLeft: "10px" }}>
        <Image
          src={"/assets/icon-search.svg"}
          alt="search icon"
          height={15}
          width={15}
        />
      </div>
      {children}
    </components.Control>
  );
};

export default Control;
