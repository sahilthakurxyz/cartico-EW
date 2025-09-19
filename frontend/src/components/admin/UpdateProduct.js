import React, { Fragment, useEffect, useState } from "react";
import styles from "./CreateProduct.module.css";
import ScreenVisual from "../../ScreenVisual";
import MetaData from "../layout/MetaData";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import DiscountIcon from "@mui/icons-material/Discount";
import BusinessIcon from "@mui/icons-material/Business";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  updateProduct,
} from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import {
  clearErrorsUpdateProduct,
  clearProductDetailErrors,
  updateProductReset,
} from "../../redux/reducers/ProductReducer";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, product } = useSelector((state) => state.product);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);

  const categories = [
    "Phone",
    "Laptop",
    "Footwear",
    "Watches",
    "Clothes",
    "Backpack",
    "Headphones",
    "Jeans",
  ];
  const updateImageHandle = (e) => {
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      setImages([]);
      setImagesPreview([]);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("discount", discount);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("companyName", companyName);
    images.map((image) => myForm.append("images", image));
    dispatch(updateProduct(id, myForm));
  };
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearProductDetailErrors());
    }
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setDiscount(product.discount);
      setCompanyName(product.companyName);
      setCategory(product.category);
      setStock(product.stock);
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrorsUpdateProduct());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/dashboard");
      dispatch(updateProductReset());
    }
  }, [alert, error, isUpdated, dispatch, navigate, product, updateError]);
  return (
    <Fragment>
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <div className={styles["create-product-main"]}>
          <ScreenVisual />
          <MetaData title="Update Product" />
          <div className={styles["create-product-container"]}>
            <div className={styles["create-product"]}>
              <form
                className={styles["create-product-form"]}
                encType="multipart/form-data"
                onSubmit={handleFormSubmit}
              >
                <h1 className={styles["heading"]}>Update Product</h1>
                <div>
                  <Inventory2Icon />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <CurrencyRupeeIcon />
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <ShowChartIcon />
                  <input
                    type="number"
                    placeholder="Stock"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div>
                  <DescriptionIcon />
                  <textarea
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <CategoryIcon />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <DiscountIcon />
                  <input
                    type="number"
                    placeholder="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div>
                  <BusinessIcon />
                  <input
                    type="text"
                    placeholder="Company Name"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="file"
                    onChange={updateImageHandle}
                    name="images"
                    accept="image/*"
                    multiple
                  />
                </div>
                <button className={styles["create-productBtn"]} type="submit">
                  Update
                </button>
              </form>
            </div>
            <div className={styles["image-container"]}>
              <div>
                <p>Products Old Images</p>

                <div>
                  {product &&
                    product.images?.map((img, index) => (
                      <img src={img.url} key={index} alt="products images" />
                    ))}
                </div>
              </div>
              <div>
                <p>Products Updated Images</p>

                <div>
                  {imagesPreview.map((img, index) => (
                    <img src={img} key={index} alt="products images" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProduct;
