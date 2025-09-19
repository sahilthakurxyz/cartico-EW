import React from "react";
import styles from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <div className={styles.loading_text}>please wait...</div>
    </div>
  );
};

export default Loader;
