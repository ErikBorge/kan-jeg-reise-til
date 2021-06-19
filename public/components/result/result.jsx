import { useState, useEffect } from "react";
import styles from "./result.module.scss";

const Result = ({ chosenCountry, countries, setChosenCountry, categories }) => {
  const [canTravel, setCanTravel] = useState(false);
  const [resultString, setResultString] = useState("");
  useEffect(() => {
    countries.forEach((country, key) => {
      if (country.name === chosenCountry) {
        setResultString(categories[country.value].name.split(":", 2)[1]);
        if (country.value !== "2") {
          setCanTravel(true);
        } else {
          setCanTravel(false);
        }
      }
    });
  }, [chosenCountry, countries, categories]);

  console.log("resultString", resultString);
  console.log("chosenCountry", chosenCountry);
  console.log("countries", countries);
  console.log("categories", categories);

  return (
    <div className={styles.result}>
      <h1>{canTravel ? "JA" : "JA, men..."}</h1>
      <div className={styles["result__header"]}>
        {resultString}
        <div
          className={styles["result__reset-button"]}
          onClick={() => setChosenCountry(false)}
        >
          x
        </div>
      </div>
      {canTravel && (
        <a
          className={styles["result__travel-button"]}
          href={`https://www.google.com/search?q=fly+til+${chosenCountry}`}
          rel="noreferrer"
          target="_blank"
        >
          Reis til {chosenCountry}
        </a>
      )}
    </div>
  );
};

export default Result;
