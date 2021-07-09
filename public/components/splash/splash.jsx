import { useState, useEffect } from "react";
import styles from "./splash.module.scss";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import Image from "next/image";

const Splash = ({ setIsLoading, hasBeenHereBefore }) => {
  console.log("hasBeenHereBefore", hasBeenHereBefore);
  const [opacity, setOpacity] = useState("1");
  useEffect(() => {
    let timeout1delay = !hasBeenHereBefore ? 6500 : 4200;
    let timeout2delay = !hasBeenHereBefore ? 6900 : 4600;
    let timeout1 = setTimeout(() => {
      setOpacity("0");
    }, timeout1delay);
    let timeout2 = setTimeout(() => {
      setIsLoading(false);
    }, timeout2delay);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div style={{ opacity: opacity }} className={styles.splash}>
      <div className={styles["splash__hourglass"]}>
        <Image
          src={"/assets/hour-glass.png"}
          alt="timeglass"
          width={40}
          height={40}
        />
      </div>
      <div className={styles["splash__lines"]}>
        <Typist
          avgTypingDelay={!hasBeenHereBefore ? 20 : 10}
          startDelay={300}
          stdTypingDelay={15}
          cursor={{ hideWhenDone: true }}
        >
          Henter data fra FHI ...
          <Typist.Delay ms={!hasBeenHereBefore ? 900 : 400} />
          <br />
          Laster vaksine-informasjon ...
          <Typist.Delay ms={!hasBeenHereBefore ? 900 : 400} />
          <br />
          <br />
          Fikser travel vibes ...
          <Typist.Delay ms={1000} />
          <br />
          <br />
          100% suksess!
        </Typist>
      </div>
    </div>
  );
};

export default Splash;
