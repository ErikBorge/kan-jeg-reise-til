import { useEffect, useState } from "react";
import styles from "./thankyouModal.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const ThankYouModal = ({ isLoading, isThankYouOpen, setIsThankYouOpen }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasClickedExit, setHasClickedExit] = useState(false);
  const [modalBackgroundColor, setModalBackgroundColor] =
    useState("rgba(0,0,0,0.5)");

  const exitThankYouModal = () => {
    setHasClickedExit(true);
    setTimeout(() => {
      setModalBackgroundColor("rgba(0,0,0,0)");
    }, 400);

    setTimeout(() => {
      setIsThankYouOpen(false);
    }, 1500);
  };

  const variants = {
    open: {
      top:
        typeof window !== "undefined" && window && window.innerWidth > 768
          ? "50%"
          : "43%",
    },
    closed: { top: "-50%" },
  };

  return (
    <div
      className={styles.modal}
      style={{ backgroundColor: modalBackgroundColor }}
    >
      <motion.div
        initial={{ top: "-50%" }}
        animate={hasClickedExit ? "closed" : "open"}
        variants={variants}
        transition={{ type: "spring", duration: 0.6 }}
        className={styles["modal__container"]}
      >
        <div className={styles["modal__text"]}>
          <div className={styles["modal__header"]}>Takk for reisen!</div>
          <div className={styles["modal__sub-header"]}>
            KanJegReiseTil.no lever fortsatt, men dataen er ikke lenger gyldig.
          </div>
        </div>
        <div>
          <Image src={"/assets/rip.svg"} alt="RIP" width={130} height={130} />
          <button
            className={styles["modal__button"]}
            onClick={() => exitThankYouModal()}
          >
            Go to gate
            <div style={{ marginLeft: "15px", transform: "translateY(4px)" }}>
              <Image
                alt="->"
                src={"/assets/arrow-pixel-black.svg"}
                width={30}
                height={30}
              />
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouModal;
