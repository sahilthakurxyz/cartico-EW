import React from "react";
import styles from "./Loader.module.css";
const ButtonLoader = ({ color }) => {
  return (
    <div
      className={styles["small-button-loader"]}
      style={{
        border: `2px solid ${color}`,
        borderTop: "2px solid transparent",
      }}
    ></div>
  );
};

export default ButtonLoader;
