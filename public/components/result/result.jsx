import { useRouter } from "next/router";
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
  slug,
}) => {
  const [resultString, setResultString] = useState(
    "Nei, du kan ikke reise til"
  );
  const [multipleRegions, setMultipleRegions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (chosenCountry.data.length > 1) {
      setMultipleRegions(true);
      let someButNotAll = false;
      let all = true;
      chosenCountry.data.map((region) => {
        if (region.value !== "2") {
          someButNotAll = true;
        } else {
          all = false;
        }
      });
      if (all) {
        setResultString("Ja, du kan reise til");
        setCanTravel(true);
      } else if (someButNotAll) {
        setResultString("Ja, du kan reise til noen steder i");
        setCanTravel(true);
      }
    } else {
      chosenCountry.data.map((region) => {
        if (region.value !== "2") {
          setCanTravel(true);
          setResultString("Ja, du kan reise til");
        }
      });
    }
  }, [chosenCountry, setCanTravel]);

  const reset = () => {
    if (slug) {
      router.push("/");
    } else {
      setChosenCountry(false);
      setCanTravel(false);
    }
  };
  //   console.log("resultString", resultString);
  //   console.log("chosenCountry", chosenCountry);
  //   console.log("countries", countries);
  //   console.log("categories", categories);

  return (
    <div className={styles.result}>
      <h1>{resultString}</h1>
      <button
        onClick={() => reset()}
        className={styles["result__chosenCountry"]}
      >
        <p>
          {countryCodes[chosenCountry.value] &&
            emojiFlags.countryCode(countryCodes[chosenCountry.value]).emoji}
        </p>
        <p>{chosenCountry.value}</p>
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
        {multipleRegions ? (
          <>
            <h4>{chosenCountry.value} har flere regioner</h4>
            {chosenCountry.data.map((region, key) => {
              return (
                <div key={key}>
                  <p>
                    <b>{region.region}</b>
                  </p>
                  <p>{region.description}</p>
                </div>
              );
            })}
          </>
        ) : (
          <h4>{resultString + ` ${chosenCountry.value}`}</h4>
        )}
      </div>
      {canTravel && (
        <a
          className={styles["result__travel-button"]}
          href={`https://www.google.com/search?q=fly+til+${chosenCountry.value}`}
          rel="noreferrer"
          target="_blank"
        >
          Reis til {chosenCountry.value}
        </a>
      )}
    </div>
  );
};

export default Result;
