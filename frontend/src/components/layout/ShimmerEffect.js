import React from "react";
import styles from "./Loader.module.css";
const ShimmerEffect = ({ width, height, borderRadius }) => {
  return (
    <div
      className={styles["skeleton-box"]}
      style={{
        width: `${width}`,
        height: `${height}`,
        borderRadius: `${borderRadius}`,
      }}
    ></div>
  );
};

export default ShimmerEffect;
