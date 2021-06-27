import styles from "../../../styles/Home.module.scss";
import Select, { components } from "react-select";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";

//Components
import Control from "../control/control";
import Option from "../option/option";
import MenuList from "../menu-list/menu-list";
import Result from "../result/result";
import LottieControl from "../lottie-control/lottie-control";
import * as gtag from "../../../lib/gtag";
import Menu from "../menu/menu";

//util
import {
  makeCategories,
  makeCountryList,
  getRandomCountrySuggestion,
  getCustomSelectStyles,
} from "../../util/util";

const Main = ({ slug, data }) => {
  const [categories, setCategories] = useState(
    data &&
      data.config &&
      data.config.colorAxis.dataClasses &&
      makeCategories(data.config.colorAxis.dataClasses)
  );
  const [countries, setCountries] = useState(
    data && data.data && data.data[0] && makeCountryList(data.data[0].data)
  );
  const [chosenCountry, setChosenCountry] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [canTravel, setCanTravel] = useState(false);
  const [canTravelToSomeButNotAll, setCanTravelToSomeButNotAll] =
    useState(false);

  const router = useRouter();
  const selectRef = useRef(null);
  const [currentSuggestion, setCurrentSuggestion] = useState(false);

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
    // changeAnimation();
    if (country) {
      setChosenCountry(country);
      // setPlay(true);
      // setPause(false);
      selectRef.current.select.blur();

      gtag.event({
        action: "search",
        category: "Countries",
        label: country.value,
      });
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const reset = () => {
    setChosenCountry(false);
    // setTimeout(() => {
    //   setCanTravel(false);
    //   setCanTravelToSomeButNotAll(false);
    // }, 700);

    // setPause(false);
    selectRef.current.select.clearValue();
    selectRef.current.select.focus();
  };

  useEffect(() => {
    if (chosenCountry) {
      if (chosenCountry.data.length > 1) {
        let someButNotAll = false;
        let all = true;
        chosenCountry.data.map((region) => {
          if (region.value !== "2" && region.value !== "3") {
            someButNotAll = true;
          } else {
            all = false;
          }
        });
        if (all) {
          setCanTravel(true);
          setCanTravelToSomeButNotAll(false);
        } else if (someButNotAll) {
          setCanTravel(true);
          setCanTravelToSomeButNotAll(true);
        }
      } else {
        chosenCountry.data.map((region) => {
          // 1: "Gul: kategorien er for tiden ikke i bruk"
          // 2: "Rød: du må i karantene ved innreise til Norge"
          // 3: "Mørk rød og rød skravert: du må i karantene og på karantenehotell ved innreise til Norge"
          // 4: "Grå: Norge blir ikke vurdert når det gjelder råd for internasjonale reiser"
          // 5: "Grønn: du må ikke i karantene ved innreise til Norge"
          if (region.value !== "2" && region.value !== "3") {
            setCanTravel(true);
            setCanTravelToSomeButNotAll(false);
            // setResultString("Ja, du kan reise til");
          } else {
            setCanTravel(false);
            setCanTravelToSomeButNotAll(false);
          }
        });
      }
    } else {
      setCanTravel(false);
      setCanTravelToSomeButNotAll(false);
    }
  }, [chosenCountry]);
  //   console.log("pause", pause);
  //   console.log("canTravel", canTravel);
  //   console.log("currentSuggestion", currentSuggestion);
  //   console.log("canTravelToSomeButNotAll", canTravelToSomeButNotAll);
  //   console.log("reverse", reverse);
  console.log("hello");
  //   console.log("slug", slug);
  // console.log("categories", categories);
  // console.log("selectCountries", selectCountries);
  //   console.log("chosenCountry", chosenCountry);
  //   console.log("countries", countries);
  //   console.log("data", data);
  const variants = {
    open: { left: "0" },
    closed: { left: "100%" },
  };
  console.log(window.innerWidth);
  return (
    <div className={styles.page}>
      <motion.nav
        initial={{ left: "100%" }}
        animate={openMenu ? "open" : "closed"}
        variants={variants}
        className={styles["page__menu"]}
      >
        <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </motion.nav>
      <div className={styles["page__wrapper"]}>
        <button
          className={styles["page__menu-button"]}
          onClick={() => setOpenMenu(!openMenu)}
          style={{
            opacity: chosenCountry ? "0" : "1",
          }}
        >
          <Image src={"/assets/e-and-e.svg"} alt="E&E" height={20} width={35} />
        </button>
        <div
          className={styles["page__panam"]}
          style={{
            opacity: chosenCountry ? "0" : "1",
          }}
        >
          <Image
            src={"/assets/panam-logo.svg"}
            alt="x"
            height={90}
            width={90}
          />
        </div>
        <div
          className={styles["page__animation"]}
          style={{
            top:
              window && window.innerWidth > 769
                ? chosenCountry
                  ? "160px"
                  : "110px"
                : "80px",
          }}
        >
          <LottieControl
            chosenCountry={chosenCountry}
            canTravel={canTravel}
            canTravelToSomeButNotAll={canTravelToSomeButNotAll}
          />
        </div>
        <div
          className={styles["page__container"]}
          style={{
            marginTop:
              window && window.innerWidth > 769
                ? chosenCountry
                  ? "100px"
                  : "120px"
                : chosenCountry
                ? "30px"
                : "100px",
          }}
        >
          <div
            className={styles["page__main"]}
            style={{
              height:
                window && window.innerWidth > 769
                  ? chosenCountry
                    ? "330px"
                    : "500px"
                  : chosenCountry
                  ? "320px"
                  : "400px",
            }}
          >
            <div className={styles["page__title"]}>
              <h1>
                {!chosenCountry
                  ? "Kan jeg"
                  : canTravelToSomeButNotAll
                  ? "Tja, du kan delvis"
                  : canTravel
                  ? "Ja, du kan"
                  : "Nei, du kan ikke"}
              </h1>
            </div>

            <div
              className={styles["page__video"]}
              style={{ opacity: chosenCountry ? "0" : "1" }}
            >
              <video playsInline autoPlay muted loop>
                <source src="/assets/miami360-short.mp4" />
                <p>Your browser does not support HTML5 video.</p>
              </video>
            </div>
            <div className={styles["page__search"]}>
              {chosenCountry && (
                <button
                  className={styles["page__search-overlay"]}
                  onClick={() => reset()}
                />
              )}
              <Select
                ref={selectRef}
                components={{
                  Control: Control,
                  Option: Option,
                  MenuList: MenuList,
                }}
                maxOptions={1}
                selectProps={{
                  chosenCountry,
                  currentSuggestion,
                  setCurrentSuggestion,
                }}
                openMenuOnClick={false}
                options={countries}
                styles={getCustomSelectStyles(
                  canTravel,
                  chosenCountry,
                  canTravelToSomeButNotAll
                )}
                //   value={chosenCountry.label}
                onChange={changeCountry}
                placeholder={countries && getRandomCountrySuggestion(countries)}
                instanceId={"search"}
              />
            </div>
          </div>
          {chosenCountry && (
            <Result
              chosenCountry={chosenCountry}
              setChosenCountry={setChosenCountry}
              countries={countries}
              categories={categories}
              canTravel={canTravel}
              setCanTravel={setCanTravel}
              slug={slug}
              canTravelToSomeButNotAll={canTravelToSomeButNotAll}
              setCanTravelToSomeButNotAll={setCanTravelToSomeButNotAll}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
