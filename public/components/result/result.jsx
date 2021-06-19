import { useState, useEffect } from "react";
import styles from "./result.module.scss";
import emojiFlags from "emoji-flags";
import Image from "next/image";

import { countryCodes } from "../../util/countryCodes";

const Result = ({
  chosenCountry,
  countries,
  setChosenCountry,
  categories,
  canTravel,
  setCanTravel,
}) => {
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
      <h1>
        {canTravel ? "Ja, du kan reise til" : "Nei, du kan ikke reise til"}
      </h1>
      <button
        onClick={() => setChosenCountry(false)}
        className={styles["result__chosenCountry"]}
      >
        <p>
          {countryCodes[chosenCountry] &&
            emojiFlags.countryCode(countryCodes[chosenCountry]).emoji}
        </p>
        <p>{chosenCountry}</p>
        <div style={{ height: "10px" }}>
          <Image
            src={"/assets/icon-cross.svg"}
            alt="x"
            height={12}
            width={12}
          />
        </div>
      </button>
      <div
        className={styles["result__header"]}
        style={{ backgroundColor: canTravel ? "darkseagreen" : "indianred" }}
      >
        {resultString}
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
