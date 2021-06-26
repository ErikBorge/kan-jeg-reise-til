import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./menu.module.scss";

const Menu = ({ openMenu, setOpenMenu }) => {
  return (
    <div className={styles.menu}>
      <motion.div className={styles["menu__top"]}>
        <button onClick={() => setOpenMenu(!openMenu)}>
          <div style={{ marginRight: "10px" }}>
            <Image
              src={"/assets/arrow-pixel-pink.svg"}
              alt="x"
              height={18}
              width={18}
            />
          </div>
          Tilbake
        </button>
      </motion.div>
      <div className={styles["menu__logo"]} style={{ marginRight: "10px" }}>
        <Image
          src={"/assets/e-and-e-logo.svg"}
          alt="x"
          height={230}
          width={230}
        />
      </div>
      <div className={styles["menu__person"]}>
        <div className={styles["menu__person-category"]}>Kode</div>
        <a
          href="https://www.linkedin.com/in/erik-borge-3b348959/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className={styles["menu__person-name"]}>
            Erik Borge
            <div
              style={{
                marginLeft: "10px",
                transform: "rotate(180deg) translateY(-2px)",
              }}
            >
              <Image
                src={"/assets/arrow-pixel-pink.svg"}
                alt="x"
                height={22}
                width={22}
              />
            </div>
          </div>
        </a>
      </div>
      <div className={styles["menu__person"]}>
        <div className={styles["menu__person-category"]}>Design</div>
        <a
          href="https://www.linkedin.com/in/erlendstoraker/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className={styles["menu__person-name"]}>
            Erlend Storaker
            <div
              style={{
                marginLeft: "10px",
                transform: "rotate(180deg) translateY(-2px)",
              }}
            >
              <Image
                src={"/assets/arrow-pixel-pink.svg"}
                alt="x"
                height={22}
                width={22}
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Menu;
