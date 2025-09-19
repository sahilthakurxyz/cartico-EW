import React, { Fragment, useEffect, useState } from "react";
import styles from "./CreateImages.module.css";
import ScreenVisual from "../../ScreenVisual";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import { createImages } from "../../redux/actions/imagesAction";
import {
  imageClearError,
  imageReset,
} from "../../redux/reducers/imagesReducer";
const CreateImages = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector(
    (state) => state.createImages
  );
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);

  const imageChangeHandle = (e) => {
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
    images.map((image) => myForm.append("images", image));
    dispatch(createImages(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(imageClearError());
    }
    if (success) {
      alert.success("Images Created Successfully");
      dispatch(imageReset());
    }
  }, [alert, error, success, dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles["create-product-main"]}>
          <ScreenVisual />
          <MetaData title="Create new Product" />
          <div className={styles["create-product-container"]}>
            <div className={styles["create-product"]}>
              <form
                className={styles["create-product-form"]}
                encType="multipart/form-data"
                onSubmit={handleFormSubmit}
              >
                <h1 className={styles["heading"]}>Create Images</h1>

                <div>
                  <input
                    type="file"
                    onChange={imageChangeHandle}
                    name="images"
                    accept="image/*"
                    multiple
                  />
                </div>
                <button
                  className={styles["create-productBtn"]}
                  type="submit"
                  disabled={imagesPreview.length > 0 ? false : true}
                >
                  Create
                </button>
              </form>
            </div>
            <div className={styles["image-container"]}>
              <div>
                <p>Products Images</p>
                <p>multiple images</p>
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

export default CreateImages;
