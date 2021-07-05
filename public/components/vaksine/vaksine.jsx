import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./vaksine.module.scss";
import Image from "next/image";

const Vaksine = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1 dose");

  const variants = {
    open: { height: "90vh" },
    closed: { height: "50px" },
  };

  //   const changeTab = (title) => {
  //     if (title === '1 dose'){
  //         setActiveTab(title)
  //     }
  //   }

  return (
    <motion.div
      initial={{ height: "50px" }}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      className={styles.vaksine}
    >
      <div className={styles["vaksine__button-wrapper"]}>
        <button
          className={styles["vaksine__button"]}
          style={{ backgroundColor: isOpen ? "#cee3d0" : "#e3ced3" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Jeg er vaksinert
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
        <div className={styles["vaksine__button-shadow"]} />
      </div>
      <div className={styles["vaksine__content"]}>
        <div className={styles["vaksine__graphics"]}>
          <Image src={"/assets/DEILIG.png"} alt="x" height={200} width={500} />
        </div>
        <div className={styles["vaksine__header"]}>
          Da er KanJegReiseTil™© søkemotoren ubrukelig for deg. Bare følg rådene
          nedenfor.
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
              <div className={styles["vaksine__info-box-tab-number"]}>1</div>{" "}
              dose
            </button>
            <button
              onClick={() => setActiveTab("2 doser")}
              className={`${styles["vaksine__info-box-tab"]} ${
                activeTab === "2 doser"
                  ? styles["vaksine__info-box-tab-active"]
                  : ""
              }`}
            >
              <div className={styles["vaksine__info-box-tab-number"]}>2</div>{" "}
              doser
            </button>
            <button
              onClick={() => setActiveTab("beskyttet")}
              className={`${styles["vaksine__info-box-tab"]} ${
                activeTab === "beskyttet"
                  ? styles["vaksine__info-box-tab-active"]
                  : ""
              }`}
            >
              Beskyttet
            </button>
          </div>
          <div className={styles["vaksine__info-box-content"]}>
            <div className={styles["vaksine__info-box-content-header"]}>
              <p>FHI.no</p>
              <div>
                <p>13:37 05.06</p>
                <Image
                  src={"/assets/icon-refresh-pixel.svg"}
                  alt="x"
                  height={18}
                  width={18}
                />
              </div>
            </div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </div>
          <div className={styles["vaksine__info-box-shadow"]} />
        </div>
      </div>
    </motion.div>
  );
};

export default Vaksine;
