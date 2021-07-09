import { components } from "react-select";
import { motion } from "framer-motion";
import Image from "next/image";

const MenuList = ({ children, ...props }) => {
  const select = () => {
    if (props.focusedOption && props.focusedOption.value) {
      props.setValue(props.focusedOption);
    }
  };
  const variants = {
    open: { left: "0" },
    closed: { left: "100%" },
  };
  if (props.selectProps.inputValue.length >= 3) {
    return (
      <components.MenuList {...props}>
        {
          Array.isArray(children)
            ? children.slice(0, props.selectProps?.maxOptions) /* Options */
            : children /* NoOptionsLabel */
        }
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: "60px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* {props.selectProps.selectProps.chosenCountry && (
            <Image
              src={"/assets/cross-pixel.svg"}
              alt="x"
              height={18}
              width={18}
            />
          )} */}
          <motion.div
            onClick={() => select()}
            initial={{ left: "100%" }}
            animate={
              props.focusedOption && props.focusedOption.value
                ? "open"
                : "closed"
            }
            variants={variants}
            style={{
              marginBottom: "10px",
              position: "absolute",
              left: "100%",
              top: "0",
              height: "100%",
              width: "100%",
              backgroundColor: "black",
              transform: "rotate(180deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Image
              src={"/assets/arrow-pixel-pink.svg"}
              alt="x"
              height={30}
              width={30}
            />
          </motion.div>
        </div>
      </components.MenuList>
    );
  } else {
    return null;
  }
};
export default MenuList;
