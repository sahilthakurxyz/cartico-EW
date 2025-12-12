import React from "react";
import styles from "./Product1.module.css";
import { Link } from "react-router-dom";

const Product1 = ({ product }) => {
  const { _id, images, name, discount } = product;

  return (
    <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
      <div className={styles?.product_container1}>
        <div className={styles?.product_image1}>
          <img src={images[0].url} alt={name} />
        </div>
        <div className={styles?.product_details1}>
          <p className={styles?.product_name1}>{name}</p>
          <p className={styles?.product_discount1}>{`${discount}% off`}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product1;
