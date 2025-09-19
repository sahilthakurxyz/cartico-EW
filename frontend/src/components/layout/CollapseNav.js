import React, { useState } from "react";
import styles from "./collapse.module.css";
import { MdOutlineMenu } from "react-icons/md";

import { RxCross1 } from "react-icons/rx";
import { red } from "@mui/material/colors";
const CollapseNav = () => {
  const [click, setClick] = useState(false);
  const handleChangeClick1 = () => {
    setClick(true);
  };
  const handleChangeClick2 = () => {
    setClick(false);
  };
  return (
    <div className={styles["collapse"]}>
      <div className={styles["menu"]}>
        {click === false ? (
          <MdOutlineMenu
            className={`${styles.icon} ${styles.fadeIn}`}
            onClick={handleChangeClick1}
            size={50}
          />
        ) : (
          <RxCross1
            className={`${styles.icon} ${styles.fadeIn}`}
            size={50}
            onClick={handleChangeClick2}
          />
        )}
      </div>
      <div className={styles["navMenu-items"]}>
        <div
          className={styles["company-logo"]}
          style={{ backgroundColor: "red" }}
        >
          hello
        </div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
      </div>
    </div>
  );
};

export default CollapseNav;
