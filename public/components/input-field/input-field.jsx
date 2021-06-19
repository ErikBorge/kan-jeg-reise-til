import Image from "next/image";
import { components } from "react-select";

const InputField = ({ input, setInput }) => {
  return (
    <input
      type="text"
      placeholder="..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    ></input>
  );
};

export default InputField;
