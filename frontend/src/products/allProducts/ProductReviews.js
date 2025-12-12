import React from "react";

import styles from "./ProductReview.module.css";
import profile from "../../images/products/profilePng.png";
import ReadOnlyStarRating from "../../Labels/ReadOnlyStarRating";
import { useSelector } from "react-redux";
const ProductReviews = ({ reviews }) => {
  const { name, rating, comment } = reviews;
  const { loading, error, user } = useSelector((state) => state.user);
  return (
    <div className={styles["product-reviews"]}>
      <div className={styles["reviews-user_info"]}>
        <div className={styles["review-user-image-container"]}>
          {user && user.avatar ? (
            <img src={user.avatar.url} alt="review cart" />
          ) : (
            <img src={profile} alt="review cart" />
          )}
        </div>
        <p className={styles["user-name"]}>{name}</p>
        <ReadOnlyStarRating ratings={rating} />
        <p className={styles["comments"]}>{comment}</p>
      </div>
    </div>
  );
};

export default ProductReviews;
