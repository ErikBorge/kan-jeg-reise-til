import { useState, useEffect } from "react";
import { components } from "react-select";
import { getRandomCountrySuggestion } from "../../util/util";

const Placeholder = ({ children, ...props }) => {
  const [placeholder, setPlaceholder] = useState(() =>
    getRandomCountrySuggestion(props.selectProps.selectProps.countries)
  );
  const [styles, setStyles] = useState({
    opacity: "1",
    transition: "opacity 0.3s ease-in-out",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      changePlaceholder();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const changePlaceholder = () => {
    setStyles((prev) => ({ ...prev, opacity: "0" }));
    setTimeout(() => {
      setPlaceholder(
        getRandomCountrySuggestion(props.selectProps.selectProps.countries)
      );
      setStyles((prev) => ({ ...prev, opacity: "1" }));
    }, 300);
  };

  return (
    <components.Placeholder {...props}>
      <div style={styles}>{placeholder}</div>
    </components.Placeholder>
  );
};

export default Placeholder;
