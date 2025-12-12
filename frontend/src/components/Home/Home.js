import React, { useEffect, useMemo, useState } from "react";
import styles from "./Home.module.css";
import ProductCard from "../../products/allProducts/ProductCard.js";
import Product1 from "../../products/bestDealProducts/Product1";
import Product2 from "../../products/bestDealProducts/Product2";
import Product3 from "../../products/bestDealProducts/Product3";
import Product4 from "../../products/bestDealProducts/Product4.js";
import Loader from "../layout/Loader.js";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  clearAllErrors,
} from "../../redux/actions/productAction.js";
import MetaData from "../layout/MetaData.js";
import StarRating from "../../Labels/StarRating.js";
import ScreenVisual from "../../ScreenVisual.js";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [discountProducts, setDiscountProducts] = useState([]);
  const [highRatingProducts, setHighRatingProducts] = useState([]);
  const [filterLaptopProducts, setFilterLaptopProducts] = useState([]);
  const [filterProductCategory, setFilterProductCategory] = useState([]);
  // Accessing the products directly from the Redux store
  const { products, error, loading } = useSelector((state) => state.products);
  //  The approach you've presented with two separate useEffect blocks is a valid and clear way to handle the logic based on the presence or absence of an error. It ensures that the getProducts action is dispatched only when there is no error, preventing an infinite loop
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearAllErrors());
    }
  }, [dispatch, error, alert]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const discountProductsArray = useMemo(
    () =>
      products ? products.filter((product) => product.discount >= 15) : [],
    [products]
  );

  const highRatingProductsArray = useMemo(
    () => (products ? products.filter((product) => product.ratings >= 3) : []),
    [products]
  );
  const filterLaptopProductsArray = useMemo(
    () =>
      products
        ? products.filter((product) => product.category === "Laptop")
        : [],
    [products]
  );
  // when data is stored in redux store and we astract the data from store here i'm just filter with category
  // all this doing on frotend because i don't wanna add more load on backend to do small things
  const filterProductsForMen = (category, products) => {
    if (!products) {
      return [];
    }
    return products.filter((product) => product.category === category);
  };
  useEffect(() => {
    setHighRatingProducts(highRatingProductsArray);

    setDiscountProducts(discountProductsArray);
    setFilterLaptopProducts(filterLaptopProductsArray);
    if (!products) {
      return;
    }
    const productWatches = filterProductsForMen("Watches", products);
    const productClothes = filterProductsForMen("Clothes", products);
    const productFootwear = filterProductsForMen("Footwear", products);
    const productBackpack = filterProductsForMen("Backpack", products);
    setFilterProductCategory([
      { category: "Watches", filterProducts: productWatches },
      { category: "Clothes", filterProducts: productClothes },
      { category: "Footwear", filterProducts: productFootwear },
      { category: "Backpack", filterProducts: productBackpack },
    ]);
  }, [
    products,
    highRatingProductsArray,
    discountProductsArray,
    filterLaptopProductsArray,
  ]);
  const options = {
    rating: 3.5,
    size: 17,
    width: 120,
    display: "flex",
    alignItems: "center",
  };

  return (
    <div>
      <>
        <MetaData title="Discover Amazing Deals at Your Ultimate Shopping Destination" />
        <div id={styles?.home_mainContainer}>
          {/* FIRST PRODUCT CONTAINER */}
          <ScreenVisual />
          <div className={styles?.first_product_container}>
            <div className={styles?.todays_best_deal}>
              <p>Today's Best Deals Products</p>
            </div>
            {/*  */}
            <div className={styles?.products_container}>
              {loading ? (
                <div className={styles["skeleton-box"]}></div>
              ) : (
                <div className={styles?.single_product_container}>
                  <div className={styles?.heading}>
                    <p>Save Up to 50%</p>
                  </div>

                  <div className={styles?.feature_products}>
                    {discountProducts && discountProducts.length >= 4 ? (
                      <>
                        <Product1 product={discountProducts[0]} />
                        <Product1 product={discountProducts[1]} />
                        <Product1 product={discountProducts[2]} />
                        <Product1 product={discountProducts[3]} />
                      </>
                    ) : (
                      <p>No discount products available</p>
                    )}
                  </div>
                </div>
              )}
              {loading ? (
                <div className={styles["skeleton-box"]}></div>
              ) : (
                <div className={styles?.single_product_container}>
                  <div className={styles?.heading}>
                    <p>Top-Rated </p>
                    <StarRating {...options} />
                  </div>
                  <div className={styles?.feature_products}>
                    {highRatingProducts && highRatingProducts.length >= 4 ? (
                      <>
                        <Product2 product={highRatingProducts[0]} />
                        <Product2 product={highRatingProducts[1]} />
                        <Product2 product={highRatingProducts[2]} />
                        <Product2 product={highRatingProducts[3]} />
                      </>
                    ) : (
                      <p>No Products with High Ratings Available</p>
                    )}
                  </div>
                </div>
              )}
              {loading ? (
                <div className={styles["skeleton-box"]}></div>
              ) : (
                <div className={styles?.single_product_container}>
                  <div className={styles?.heading}>
                    <p>Up To 20% to 50% off | For Men </p>
                  </div>

                  <div className={styles?.feature_products}>
                    {filterProductCategory.length > 0 &&
                    filterProductCategory[0].filterProducts.length > 0 ? (
                      <>
                        <Product3
                          product={filterProductCategory[0].filterProducts[0]}
                        />
                        <Product3
                          product={filterProductCategory[1].filterProducts[0]}
                        />
                        <Product3
                          product={filterProductCategory[2].filterProducts[0]}
                        />
                        <Product3
                          product={filterProductCategory[3].filterProducts[0]}
                        />
                      </>
                    ) : (
                      <p>No Products Available</p>
                    )}
                  </div>
                </div>
              )}
              {loading ? (
                <div className={styles["skeleton-box"]}></div>
              ) : (
                <div className={styles?.single_product_container}>
                  <div className={styles?.heading}>
                    <p>Laptops</p>
                  </div>

                  {filterLaptopProducts && filterLaptopProducts.length >= 4 ? (
                    <div className={styles?.feature_products}>
                      <Product4 product={filterLaptopProducts[0]} />
                      <Product4 product={filterLaptopProducts[1]} />
                      <Product4 product={filterLaptopProducts[2]} />
                      <Product4 product={filterLaptopProducts[3]} />
                    </div>
                  ) : (
                    <p>No Product Available</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SECOND PRODUCT CONTAINER */}
          <div className={styles?.second_products_container}>
            <div className={styles?.shop_all_products}>
              <p> Shop All Products in One Place</p>
            </div>
            <div className={styles?.all_products}>
              {products &&
                products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
