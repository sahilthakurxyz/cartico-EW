import React from "react";

import styles from "./Product3.module.css";
import { Link } from "react-router-dom";
import ReadOnlyStarRating from "../../Labels/ReadOnlyStarRating";

const Product3 = ({ product }) => {
  const { _id, name, images, ratings, category } = product;

  return (
    <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
      <div className={styles?.product_container3}>
        <div className={styles?.product_image3}>
          <img src={images[0].url} alt={name} />
        </div>
        <div className={styles?.product_details3}>
          <p className={styles?.product_name3}>{category}</p>
          <div className={styles?.product_rating3}>
            <ReadOnlyStarRating ratings={ratings} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product3;
