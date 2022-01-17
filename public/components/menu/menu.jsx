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
      <a
        href="https://www.kode24.no/artikkel/arets-hobbyprosjekt---goy-a-treffe-nerven/75043502"
        target="_blank"
        rel="noreferrer noopener"
        className={styles["menu__winner-banner-link"]}
      >
        <div className={styles["menu__winner-banner"]}>
          <div className={styles["menu__winner-banner-inner"]}>
            <div style={{ marginRight: "15px" }}>
              <Image
                src={"/assets/star.svg"}
                alt="star"
                height={42}
                width={45}
              />
            </div>
            <div>
              <div className={styles["menu__winner-header"]}>
                Årets hobbyprosjekt
              </div>
              <div className={styles["menu__winner-subheader"]}>
                Les mer på kode24.no
                <div
                  style={{ marginLeft: "5px", transform: "translateY(2px)" }}
                >
                  <Image
                    alt="->"
                    src={"/assets/arrow-pixel-black.svg"}
                    width={15}
                    height={15}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
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
          className={styles["menu__person-name"]}
        >
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
        </a>
      </div>
      <div className={styles["menu__person"]}>
        <div className={styles["menu__person-category"]}>Design</div>
        <a
          href="https://www.linkedin.com/in/erlendstoraker/"
          target="_blank"
          rel="noreferrer noopener"
          className={styles["menu__person-name"]}
        >
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
        </a>
      </div>
    </div>
  );
};

export default Menu;
