import React from "react";

import styles from "./Product4.module.css";
import { Link } from "react-router-dom";

const  Product4 = ({ product }) => {
  const { _id, name, images, ratings, discount } = product;
  return (
    <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
      <div className={styles?.product_container4}>
        <div className={styles?.product_image4}>
          <img src={images[0].url} alt={name} />
        </div>
        <div className={styles?.product_details4}>
          <p className={styles?.product_name4}>{name}</p>
          <div className={styles?.product_discount4}>{`${discount}% off`}</div>
        </div>
      </div>
    </Link>
  );
};

export default Product4;
