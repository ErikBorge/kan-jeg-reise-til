import styles from "../../../styles/Home.module.scss";
import Select, { createFilter } from "react-select";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";

//Components
import Control from "../control/control";
import MenuList from "../menu-list/menu-list";
import SingleValue from "../single-value/single-value";
import Placeholder from "../placeholder/placeholder";
import Result from "../result/result";
import LottieControl from "../lottie-control/lottie-control";
import * as gtag from "../../../lib/gtag";
import Menu from "../menu/menu";
import Vaksine from "../vaksine/vaksine";

//util
import {
  //   makeCategories,
  makeCountryList,
  getRandomCountrySuggestion,
  getCustomSelectStyles,
} from "../../util/util";

const Main = ({ slug, data, children }) => {
  //   const [categories, setCategories] = useState(
  //     () =>
  //       data &&
  //       data.config &&
  //       data.config.colorAxis.dataClasses &&
  //       makeCategories(data.config.colorAxis.dataClasses)
  //   );
  const [countries, setCountries] = useState(
    () => data && data.data && data.data.data && makeCountryList(data.data.data)
  );
  const [chosenCountry, setChosenCountry] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [canTravel, setCanTravel] = useState(false);
  const [canTravelToSomeButNotAll, setCanTravelToSomeButNotAll] =
    useState(false);

  const router = useRouter();
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isVaksineOpen, setIsVaksineOpen] = useState(false);

  useEffect(() => {
    if (slug && countries) {
      let matched = false;
      countries.forEach((country) => {
        if (slug.toLowerCase() === country.value.toLowerCase()) {
          changeCountry(country);
          matched = true;
          selectRef.current.select.setValue(country);
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
      setIsFocused(false);

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
    // if (slug) {
    //   router.push("/");
    // }
    setChosenCountry(false);
    selectRef.current.select.clearValue();
    selectRef.current.select.focus();
  };

  useEffect(() => {
    if (chosenCountry) {
      if (chosenCountry.data.length > 1) {
        let someButNotAll = false;
        let all = true;
        chosenCountry.data.map((region) => {
          // TODO: support for alle nye kategorier
          if (
            region.value !== "2" &&
            region.value !== "3" &&
            region.value !== "6" &&
            region.value !== "7" &&
            region.value !== "8"
          ) {
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
          // TODO: support for alle nye kategorier
          if (
            region.value !== "2" &&
            region.value !== "3" &&
            region.value !== "6" &&
            region.value !== "7" &&
            region.value !== "8"
          ) {
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
  //   console.log("hello");
  //   console.log("slug", slug);
  // console.log("categories", categories);
  // console.log("selectCountries", selectCountries);
  // console.log("chosenCountry", chosenCountry);
  //   console.log("countries", countries);
  //   console.log("data", data);
  const variants = {
    open: { left: "0" },
    closed: { left: "100%" },
  };
  const openMenuFunc = () => {
    if (!openMenu) {
      gtag.event({
        action: "open_menu",
        category: "open_menu",
        label: "open_menu",
      });
    }
    setOpenMenu(!openMenu);
  };

  return (
    <div className={styles.page} id="home-page">
      {children}
      <motion.nav
        initial={{ left: "100%" }}
        animate={openMenu ? "open" : "closed"}
        variants={variants}
        className={styles["page__menu"]}
        onClick={() => openMenuFunc()}
      >
        <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </motion.nav>
      <div className={styles["page__wrapper"]}>
        <button
          className={styles["page__menu-button"]}
          onClick={() => setOpenMenu(!openMenu)}
          style={{
            opacity: chosenCountry || isVaksineOpen ? "0" : "1",
          }}
        >
          <Image src={"/assets/e-and-e.svg"} alt="E&E" height={20} width={35} />
        </button>
        <div
          className={styles["page__panam"]}
          style={{
            opacity: chosenCountry || isVaksineOpen ? "0" : "1",
          }}
        >
          <Image
            src={"/assets/panam-logo.svg"}
            alt="x"
            height={60}
            width={60}
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
                  MenuList: MenuList,
                  SingleValue: SingleValue,
                  Placeholder: Placeholder,
                }}
                maxOptions={1}
                selectProps={{ chosenCountry, countries }}
                openMenuOnClick={false}
                options={countries}
                styles={getCustomSelectStyles(
                  canTravel,
                  chosenCountry,
                  canTravelToSomeButNotAll
                )}
                //   value={chosenCountry.label}
                onChange={changeCountry}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
                instanceId={"search"}
                menuShouldScrollIntoView={false}
                filterOption={createFilter({
                  ignoreCase: true,
                  ignoreAccents: false,
                  trim: false,
                  matchFrom: "start",
                })}
              />
              {/* {isFocused && (
                <div className={styles["page__search-explanation"]}>
                  Søk etter land i Europa
                </div>
              )} */}
            </div>
          </div>
          {chosenCountry && (
            <Result
              chosenCountry={chosenCountry}
              setChosenCountry={setChosenCountry}
              countries={countries}
              //   categories={categories}
              canTravel={canTravel}
              setCanTravel={setCanTravel}
              slug={slug}
              canTravelToSomeButNotAll={canTravelToSomeButNotAll}
              setCanTravelToSomeButNotAll={setCanTravelToSomeButNotAll}
            />
          )}
        </div>
      </div>
      <Vaksine
        isOpen={isVaksineOpen}
        setIsOpen={setIsVaksineOpen}
        chosenCountry={chosenCountry}
      />
    </div>
  );
};

export default Main;
