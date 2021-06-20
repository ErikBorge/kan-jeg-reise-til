import Head from "next/head";
import styles from "../../../styles/Home.module.scss";
import Select, { components } from "react-select";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//Components
import Control from "../control/control";
import Result from "../result/result";

//util
import {
  customSelectStyles,
  makeCategories,
  makeCountryList,
} from "../../util/util";

const Main = ({ slug, data }) => {
  const [chosenCountry, setChosenCountry] = useState(false);
  const [categories, setCategories] = useState(
    data &&
      data.config &&
      data.config.colorAxis.dataClasses &&
      makeCategories(data.config.colorAxis.dataClasses)
  );
  const [countries, setCountries] = useState(
    data && data.data && data.data[0] && makeCountryList(data.data[0].data)
  );
  const [canTravel, setCanTravel] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (slug && countries) {
      let matched = false;
      countries.forEach((country) => {
        if (slug.toLowerCase() === country.value.toLowerCase()) {
          setChosenCountry(country);
          matched = true;
        }
      });
      if (!matched) {
        router.push("/");
      }
    }
  }, [slug, countries]);

  const changeCountry = (country) => {
    setChosenCountry(country);
  };

  //   console.log("slug", slug);
  // console.log("categories", categories);
  // console.log("selectCountries", selectCountries);
  //   console.log("chosenCountry", chosenCountry);
  //   console.log("countries", countries);
  //   console.log("data", data);
  return (
    <div className={styles.page}>
      <div className={styles["page__container"]}>
        <div className={styles["page__emoji-container"]}>
          {!chosenCountry ? (
            <div style={{ position: "absolute", right: "0" }}>🌞</div>
          ) : (
            <div className={styles["page__emojis"]}>
              {canTravel
                ? "🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞"
                : "😑😑😑😑😑😑😑😑😑😑😑😑😑"}
            </div>
          )}
        </div>
        <h1 style={{ display: !chosenCountry ? "block" : "none" }}>
          Kan jeg reise til...?
        </h1>
        <div className={styles["page__search"]}>
          {!chosenCountry ? (
            <Select
              components={{ Control }}
              options={countries}
              styles={customSelectStyles}
              value={chosenCountry.value}
              onChange={changeCountry}
              placeholder={"Velg et land..."}
              instanceId={"search"}
            />
          ) : (
            <Result
              chosenCountry={chosenCountry}
              setChosenCountry={setChosenCountry}
              countries={countries}
              categories={categories}
              canTravel={canTravel}
              setCanTravel={setCanTravel}
              slug={slug}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
