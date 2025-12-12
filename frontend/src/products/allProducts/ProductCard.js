import React from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import ReadOnlyStarRating from "../../Labels/ReadOnlyStarRating";
const ProductCard = ({ product }) => {
  const { name, _id, discount, price, ratings, NumOfReviews } = product;
  const image = product.images[0].url;
  return (
    <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
      <div className={styles?.product_container} key={_id}>
        <div className={styles?.product}>
          <div className={styles?.image_container}>
            <img src={image} alt={name} key={1} className={styles?.image} />
          </div>
          <div className={styles?.product_details}>
            <div className={styles?.left}>
              <div className={styles?.name}>{name}</div>
              <div className={styles?.price}>
                <FaRupeeSign />
                {price}
              </div>
              <div className={styles?.reviews}>
                <span>
                  <MdOutlineRateReview />
                </span>
                <span> {NumOfReviews}</span>
                <span className={styles?.rev}>Reviws</span>
              </div>
            </div>
            <div className={styles?.right}>
              <div className={styles?.discount}>{`${discount}% off`}</div>
              <div className={styles?.ratings_star}>
                <ReadOnlyStarRating ratings={ratings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
