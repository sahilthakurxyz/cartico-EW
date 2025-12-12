import React from "react";
import styles from "./NoProductMessage.module.css"; // Create a CSS module for styling if needed

const NoProductMessage = ({ result }) => {
  return (
    <div className={styles["no-product-message"]}>
      No product available related to <span> {result}</span> Search
    </div>
  );
};

export default NoProductMessage;
