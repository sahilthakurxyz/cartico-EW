import React from "react";

import styles from "./Product2.module.css";
import { Link } from "react-router-dom";
import ReadOnlyStarRating from "../../Labels/ReadOnlyStarRating";

const Product2 = ({ product }) => {
  const { _id, name, images, ratings } = product;

  return (
    <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
      <div className={styles?.product_container2}>
        <div className={styles?.product_image2}>
          <img src={images[0].url} alt={name} />
        </div>
        <div className={styles?.product_details2}>
          <p className={styles?.product_name2}>{name}</p>
          <div className={styles?.product_rating2}>
            <ReadOnlyStarRating ratings={ratings} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product2;
