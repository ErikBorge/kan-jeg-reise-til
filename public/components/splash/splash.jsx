import { useState, useEffect } from "react";
import styles from "./splash.module.scss";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import Image from "next/image";

const Splash = ({ setIsLoading }) => {
  const [opacity, setOpacity] = useState("1");
  useEffect(() => {
    setTimeout(() => {
      setOpacity("0");
    }, 4900);
    setTimeout(() => {
      setIsLoading(false);
    }, 5300);
  }, []);
  console.log(opacity);
  return (
    <div style={{ opacity: opacity }} className={styles.splash}>
      <Image
        src={"/assets/hour-glass.png"}
        alt="timeglass"
        width={40}
        height={40}
      />
      <div className={styles["splash__lines"]}>
        <Typist
          avgTypingDelay={20}
          startDelay={300}
          stdTypingDelay={15}
          cursor={{ hideWhenDone: true }}
        >
          Henter data fra FHI ...
          <Typist.Delay ms={600} />
          <br />
          Laster vaksine-informasjon ...
          <Typist.Delay ms={600} />
          <br />
          <br />
          Queuer Santana - Smooth ...
          <Typist.Delay ms={500} />
          <br />
          <br />
          100% suksess!
        </Typist>
      </div>
    </div>
  );
};

export default Splash;
