import React from "react";
import styles from "./SearchProducts.module.css";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReadOnlyStarRating from "../../Labels/ReadOnlyStarRating";

// function to make how much word length you want to show in
// function truncateDescription(description, maxlength) {
//   if (!description) {
//     return "";
//   }
//   const words = description.split(" ");
//   if (words.length <= maxlength) {
//     return description;
//   }
//   const truncateWords = words.slice(0, maxlength);
//   return `${truncateWords.join(" ")}....`;
// }
// {truncateDescription(description, 20).toString()}
const SearchProducts = ({ product }) => {
  const { brand, description, ratings, price, discount, images, _id } = product;
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;
  return (
    <Link style={{ textDecoration: "none" }} to={`/product/${_id}`}>
      <div className={styles["product-details-container"]}>
        <div className={styles["product-Image"]}>
          <img
            src={images[0].url}
            alt="image"
            key={images[0]._id}
            className={styles?.image}
          />
        </div>
        <div className={styles["product-details-info"]}>
          <p className={styles["brand-name"]}>{brand}</p>

          <div className={styles["description"]}>{description}</div>
          <div className={styles["ratings"]}>
            <ReadOnlyStarRating ratings={ratings} />
          </div>
          <div className={styles["product-price"]}>
            <div className={styles["discount-price"]}>
              <FaRupeeSign className={styles["discount-price-rupee-sign"]} />
              <p className={styles["discount-price-digit"]}>
                {discountedPrice.toLocaleString()}
              </p>
            </div>
            {discount > 0 ? (
              <div className={styles["actual-price"]}>
                <p className={styles["m-r-p"]}>M.R.P</p>
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    top: "-4px",
                    marginLeft: "6px",
                  }}
                >
                  <FaRupeeSign
                    style={{
                      position: "relative",
                      top: "1.7vmax",
                      fontSize: "12px",
                    }}
                  />{" "}
                  <p className={styles["actual-price-digits"]}>
                    {price.toLocaleString()}
                  </p>
                  <div className={styles["cut-line"]}></div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className={styles["discount"]}>({discount}%)</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchProducts;
