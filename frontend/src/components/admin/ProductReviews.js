import React, { Fragment, useEffect, useState } from "react";
import "./ProductReviews.css";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import Loader from "../layout/Loader";
import { deleteReview, getAllReviews } from "../../redux/actions/productAction";
import {
  clearErrorDeleteReview,
  clearErrorsReviews,
  deleteReviewReset,
} from "../../redux/reducers/ProductReducer";
import { useAlert } from "react-alert";
import ScreenVisual from "../../ScreenVisual";
const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [productId, setProductId] = useState("");
  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews
  );
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteReview);
  const deleteReviewHandler = (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteReview(reviewId, productId));
    } else {
      return;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };
  const columns = [
    { field: "id", HeadersName: "Review Id", minWidth: 220 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
    },
    {
      field: "rating",
      headerName: "Rating",

      minWidth: 110,
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 400,
    },
    {
      field: "actions",
      HeadersName: "Actions",
      type: "number",
      minWidth: 100,

      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        rating: item.rating,
        comment: item.comment,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorsReviews());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrorDeleteReview());
    }
    if (isDeleted) {
      alert.success("Review Delete SuccessFully");
      navigate("/admin/reviews");
      dispatch(deleteReviewReset());
    }
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
  }, [
    dispatch,
    productId,
    alert,
    error,
    deleteError,
    deleteLoading,
    isDeleted,
    navigate,
  ]);
  return (
    <Fragment>
      {loading || deleteLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <ScreenVisual />
          {deleteLoading && (
            <div className="deleteLoading">
              <div>
                <p>
                  Product deletion in progress. <span>Please wait</span> while
                  the system completes the process...
                </p>
              </div>
            </div>
          )}
          <MetaData title="All Reviews -- Admin" />
          <div className="productList-main">
            <Sidebar />
            <div>
              <Typography>All Reviews</Typography>
              <div className="create-product">
                <form
                  className="create-product-form"
                  encType="multipart/form-data"
                  onSubmit={handleFormSubmit}
                >
                  <div>
                    <SavedSearchIcon />
                    <input
                      type="text"
                      placeholder="Product Id"
                      required
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>
                  <button className="create-productBtn" type="submit">
                    Search
                  </button>
                </form>
              </div>

              <div className="productList-data-container">
                {reviews.length > 0 ? (
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(rows) => rows.id}
                    pageSizeOptions={[4, 100]}
                    disableRowSelectionOnClick
                    className="productListTable"
                  />
                ) : (
                  <h1>No Reviews Found </h1>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductReviews;
