import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./vaksine.module.scss";
import Image from "next/image";
import Lottie from "react-lottie";
import * as deilig_appear from "../../assets/deilig-appear.json";
import * as deilig_shimmer from "../../assets/deilig-shimmer.json";
import * as gtag from "../../../lib/gtag";

const Vaksine = ({ isOpen, setIsOpen, chosenCountry, isLoading }) => {
  //   const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1 dose");
  const [animationHasInitialized, setAnimationHasInitialized] = useState(false);
  const [animationStopped, setAnimationStopped] = useState(false);
  const [homeElement, setHomeElement] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimationStopped(false);
      // document.getElementById("home-page").style.overflowY = "visible";
      //   document.getElementById("home-page").style.minHeight = `calc(~"100vh+${
      //     document.getElementById("vaksine-container").offsetHeight
      //   }px")`;
      let elementHeight = 924;
      let el = (document.getElementById(
        "home-page"
      ).style.minHeight = `calc(100px + ${
        document.getElementById("vaksine-container").offsetHeight
      }px)`);
      //   console.log("el", el);
      // 'calc(~"102vh+924px")';
    } else {
      setAnimationStopped(true);
      setAnimationHasInitialized(false);
      // document.getElementById("home-page").style.overflowY = "hidden";
      document.getElementById("home-page").style.minHeight = "100vh";
      //   console.log("reset");
    }
  }, [isOpen]);

  useEffect(() => {
    setHomeElement(document.getElementById("home-page"));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setHasLoaded(true);
      }, 1000);
    }
  }, [isLoading]);

  const defaultOptions = {
    loop: !animationHasInitialized ? false : true,
    autoplay: false,
    animationData: !animationHasInitialized ? deilig_appear : deilig_shimmer,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      filterSize: {
        width: "600%",
        height: "600%",
        x: "-200%",
        y: "-200%",
      },
    },
  };

  const variants = {
    open: { top: "100px" },
    closed: {
      top: !hasLoaded
        ? "200%"
        : chosenCountry
        ? "120%"
        : window.innerWidth > 769
        ? `calc(0.95*${homeElement && homeElement.offsetHeight}px)`
        : `calc(0.8*${homeElement && homeElement.offsetHeight}px)`,
    },
  };

  //   const changeTab = (title) => {
  //     if (title === '1 dose'){
  //         setActiveTab(title)
  //     }
  //   }

  const toggleVaksine = () => {
    // TODO: add gtag event
    if (!isOpen) {
      gtag.event({
        action: "clicked_vaksine_button",
        category: "Vaksine",
        label: "clicked_vaksine_button",
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      initial={{
        top: !hasLoaded
          ? "200%"
          : chosenCountry
          ? "120%"
          : window.innerWidth > 769
          ? `calc(0.95*${homeElement && homeElement.offsetHeight}px)`
          : `calc(0.8*${homeElement && homeElement.offsetHeight}px)`,
      }}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      className={styles.vaksine}
      transition={{ type: "spring", duration: !hasLoaded ? 0.2 : 0.6 }}
      id="vaksine-container"
    >
      <div className={styles["vaksine__button-wrapper"]}>
        <button
          className={styles["vaksine__button"]}
          style={{
            backgroundColor: isOpen ? "#cee3d0" : "#e3ced3",
            borderColor: isOpen ? "black" : "#958888",
          }}
          onClick={() => toggleVaksine()}
        >
          Jeg er beskyttet / vaksinert
          {isOpen && (
            <div
              style={{
                height: "100%",
                marginLeft: "10px",
                transform: "translateY(2px)",
              }}
            >
              <Image
                src={"/assets/cross-pixel.svg"}
                alt="x"
                height={18}
                width={18}
              />
            </div>
          )}
        </button>
        <div
          className={styles["vaksine__button-shadow"]}
          style={{ display: isOpen ? "none" : "block" }}
        />
      </div>
      <div className={styles["vaksine__content"]}>
        <div className={styles["vaksine__graphics"]}>
          <Lottie
            options={defaultOptions}
            // height={400}
            // width={400}
            isStopped={animationStopped}
            isPaused={false}
            isClickToPauseDisabled={true}
            speed={!animationHasInitialized ? 0.8 : 1}
            eventListeners={[
              {
                eventName: "complete",
                callback: () => {
                  //   console.log("********** animation completed **********");
                  setAnimationHasInitialized(true);
                },
              },
            ]}
          />
        </div>
        <div className={styles["vaksine__info-box"]}>
          <div className={styles["vaksine__info-box-tabz"]}>
            <button
              onClick={() => setActiveTab("1 dose")}
              className={`${styles["vaksine__info-box-tab"]} ${
                activeTab === "1 dose"
                  ? styles["vaksine__info-box-tab-active"]
                  : ""
              }`}
            >
              Kun 1 dose
            </button>
            <button
              onClick={() => setActiveTab("fullvaksinert")}
              className={`${styles["vaksine__info-box-tab"]} ${
                activeTab === "fullvaksinert"
                  ? styles["vaksine__info-box-tab-active"]
                  : ""
              }`}
              style={{ flex: "1" }}
            >
              Fullvaksinert / immun
            </button>
          </div>
          <div className={styles["vaksine__info-box-content"]}>
            {activeTab === "1 dose" ? (
              <>
                <div className={styles["vaksine__info-box-content-header"]}>
                  <a
                    href="https://www.fhi.no/nettpub/coronavirus/fakta/reiserad-knyttet-til-nytt-koronavirus-coronavirus/#eus-utvalgte-tredjeland-lilla-land-og-omraader"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    FHI.no
                  </a>
                  <div>5. juni</div>
                </div>
                <div className={styles["vaksine__info-box-content-text"]}>
                  Du må i karantene om du kommer reisende fra et rødt land. Ta
                  en koronatest etter 3 døgn – tester du negativt kan du avbryte
                  karantenen.
                </div>
              </>
            ) : (
              <>
                <div className={styles["vaksine__info-box-content-header"]}>
                  <a
                    href="https://www.fhi.no/nettpub/coronavirus/fakta/reiserad-knyttet-til-nytt-koronavirus-coronavirus/#eus-utvalgte-tredjeland-lilla-land-og-omraader"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    FHI.no
                  </a>
                  <div>5. juni</div>
                </div>
                <div className={styles["vaksine__info-box-content-text"]}>
                  Er du fullvaksinert, eller har hatt korona de siste 6
                  månedene, så slipper du karantene overalt når du har med
                  koronasertfikatet ditt.
                </div>
              </>
            )}
          </div>
          <div className={styles["vaksine__info-box-shadow"]} />
        </div>
        <div
          className={styles["vaksine__button-wrapper"]}
          style={{
            transform: "unset",
            marginTop: "70px",
            marginBottom: "120px",
          }}
        >
          <button
            className={styles["vaksine__button"]}
            onClick={() => toggleVaksine()}
            style={{ borderColor: "black", backgroundColor: "#cee3d0" }}
          >
            Den er grej
          </button>
          <div
            className={styles["vaksine__button-shadow"]}
            style={{ backgroundColor: "black" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Vaksine;
