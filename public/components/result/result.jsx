import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./result.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const Result = ({
  chosenCountry,
  countries,
  setChosenCountry,
  //   categories,
  canTravel,
  setCanTravel,
  canTravelToSomeButNotAll,
  setCanTravelToSomeButNotAll,
  slug,
}) => {
  const [resultString, setResultString] = useState(
    "Nei, du kan ikke reise til"
  );
  const [expandRegions, setExpandRegions] = useState(false);
  const [numberOfRegions, setNumberOfRegions] = useState(0);
  const [showFHILink, setShowFHILink] = useState(false);

  const router = useRouter();

  //   const reset = () => {
  //     if (slug) {
  //       router.push("/");
  //     } else {
  //       setChosenCountry(false);
  //       setCanTravel(false);
  //     }
  //   };
  //   console.log("resultString", resultString);
  //   console.log("chosenCountry", chosenCountry);
  //   console.log("countries", countries);
  //   console.log("categories", categories);
  const variants = {
    open: {
      height: `${63 * numberOfRegions + 30 + 65}px`,
      staggerChildren: 0.5,
    },
    closed: { height: "65px" },
  };

  const containerVariants = {
    open: {
      height: canTravel && !canTravelToSomeButNotAll ? "220px" : "140px",
    },
    closed: {
      height: canTravel && !canTravelToSomeButNotAll ? "190px" : "110px",
    },
  };

  const arrowVariants = {
    up: { rotate: 180, translateY: "-2px" },
    down: { rotate: 0, translateY: "5px" },
  };
  useEffect(() => {
    if (chosenCountry && chosenCountry.data.length > 1) {
      setNumberOfRegions(chosenCountry.data.length);
    }
  }, [chosenCountry]);
  //   useEffect(() => {
  //     console.log(
  //       "chosenCountry",
  //       chosenCountry && chosenCountry.value,
  //       "canTravel",
  //       canTravel,
  //       "canTravelToSomeButNotAll",
  //       canTravelToSomeButNotAll
  //     );
  //   });

  return (
    <div className={styles.result}>
      <div className={styles["result__shadow"]} />

      <div
        className={styles["result__fuckyouerlend"]}
        style={{
          backgroundColor: canTravelToSomeButNotAll
            ? "rgb(223, 206, 144)"
            : canTravel
            ? "white"
            : "rgb(223, 144, 144)",
        }}
      />
      {chosenCountry && chosenCountry.value === "Norge" ? (
        <div
          className={styles["result__container"]}
          style={{
            backgroundColor: "white",
            height: "240px",
          }}
        >
          <div
            className={styles["result__header"]}
            style={{ marginTop: "0px" }}
          >
            Null karantene på innenlandsreiser!
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-3px",
              left: "0",
            }}
          >
            <Image
              src={"/assets/harald.png"}
              alt="x"
              height={140}
              width={210}
            />
          </div>
        </div>
      ) : (
        <motion.div
          className={styles["result__container"]}
          style={{
            backgroundColor: canTravelToSomeButNotAll
              ? "rgb(223, 206, 144)"
              : canTravel
              ? "white"
              : "rgb(223, 144, 144)",
          }}
          initial={{
            height: canTravel && !canTravelToSomeButNotAll ? "190px" : "110",
          }}
          animate={showFHILink ? "open" : "closed"}
          variants={containerVariants}
          onClick={() => setShowFHILink(!showFHILink)}
        >
          {canTravel && !canTravelToSomeButNotAll && (
            <div className={styles["result__postcard"]}>
              <div className={styles["result__postcard-left"]}>
                <div className={styles["result__postcard-panam"]}>
                  <Image
                    src={"/assets/panam-logo.svg"}
                    alt="x"
                    height={30}
                    width={30}
                  />
                </div>
                <div className={styles["result__postcard-date"]}>
                  {new Date().toLocaleDateString("no-NO", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className={styles["result__postcard-right"]}>
                <Image
                  src={"/assets/stamp.png"}
                  alt="x"
                  height={40}
                  width={60}
                />
              </div>
            </div>
          )}
          <div
            className={styles["result__header"]}
            style={{
              marginTop: canTravel && !canTravelToSomeButNotAll ? "30px" : "0",
            }}
          >
            {canTravelToSomeButNotAll
              ? `Noen regioner i ${chosenCountry.value} krever karantene når du kommer hjem.`
              : canTravel
              ? `Du slipper karantene når du kommer fra ${chosenCountry.value}.`
              : `Du må i karantene om du kommer reisende fra ${chosenCountry.value}.`}
          </div>
          <div
            className={styles["result__link"]}
            style={{ display: showFHILink ? "flex" : "none" }}
          >
            <a
              href="https://www.fhi.no/nettpub/coronavirus/fakta/reiserad-knyttet-til-nytt-koronavirus-coronavirus/?term=&h=1#innreisekarantene-ved-ankomst-til-norge"
              target="_blank"
              rel="noreferrer noopener"
            >
              Les mer på FHIs nettsider
            </a>
            <div style={{ marginLeft: "10px", transform: "translateY(2px)" }}>
              <Image
                src={"/assets/arrow-pixel.svg"}
                alt="x"
                height={13}
                width={13}
              />
            </div>
          </div>
        </motion.div>
      )}
      {numberOfRegions && canTravelToSomeButNotAll ? (
        <motion.div
          initial={{ height: "100%" }}
          animate={expandRegions ? "open" : "closed"}
          variants={variants}
          className={styles["result__regions-container"]}
        >
          <button
            className={styles["result__regions-header"]}
            onClick={() => setExpandRegions(!expandRegions)}
          >
            {numberOfRegions} regioner
            <motion.div
              //   initial={{ height: "100%" }}
              animate={expandRegions ? "up" : "down"}
              variants={arrowVariants}
              className={styles["result__expand-arrow"]}
            >
              <Image
                src={"/assets/expand-arrow-pixel.svg"}
                alt=">"
                height={18}
                width={18}
              />
            </motion.div>
          </button>
          <div className={styles["result__regions"]}>
            {expandRegions &&
              chosenCountry &&
              chosenCountry.data.length > 1 &&
              chosenCountry.data.map((region, key) => {
                return (
                  <div key={key} className={styles["result__region"]}>
                    <div style={{ marginRight: "30px" }}>{region.region}</div>
                    <div style={{ color: "rgb(149, 136, 136)" }}>
                      {region.description.split(".", 1)[0]}
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default Result;

{
  /* {multipleRegions ? (
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
        )} */
}
{
  /* {canTravel && chosenCountry && (
        <a
          className={styles["result__travel-button"]}
          href={`https://www.google.com/search?q=fly+til+${chosenCountry.value}`}
          rel="noreferrer"
          target="_blank"
        >
          Reis til {chosenCountry.value}
        </a>
      )} */
}
