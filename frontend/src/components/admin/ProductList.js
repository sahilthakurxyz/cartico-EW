import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";

import Loader from "../layout/Loader";
import {
  deleteProduct,
  getAdminProduct,
} from "../../redux/actions/productAction";
import {
  adminProductsClearError,
  clearErrorsDeleteProduct,
  deleteProductReset,
} from "../../redux/reducers/ProductReducer";
import { useAlert } from "react-alert";
import ScreenVisual from "../../ScreenVisual";
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alertError = useAlert();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteProduct);
  const deleteProductHandler = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(id));
    } else {
      return;
    }
  };
  const columns = [
    { field: "id", HeadersName: "Product Id", minWidth: 220 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 200,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
    },
    {
      field: "actions",
      HeadersName: "Actions",
      type: "number",
      minWidth: 200,

      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/update/product/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });
  useEffect(() => {
    if (error) {
      alertError.error(error);
      dispatch(adminProductsClearError());
    }
    if (deleteError) {
      alertError.error(deleteError);
      dispatch(clearErrorsDeleteProduct());
    }
    if (isDeleted) {
      alertError.success("Product Delete SuccessFully");
      navigate("/admin/dashboard");
      dispatch(deleteProductReset());
    }
    dispatch(getAdminProduct());
  }, [
    dispatch,
    alertError,
    deleteError,
    isDeleted,
    navigate,
    deleteLoading,
    error,
  ]);
  return (
    <Fragment>
      {loading ? (
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
          <MetaData title="All Products -- Admin" />
          <div className="productList-main">
            <Sidebar />
            <div>
              <Typography>All Products</Typography>
              {products.length > 0 ? (
                <div className="productList-data-container">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(rows) => rows.id}
                    pageSizeOptions={[10, 100]}
                    disableRowSelectionOnClick
                    className="productListTable"
                  />
                </div>
              ) : (
                <div className="empty-bucket">
                  <div>
                    <ShopTwoIcon />
                    <p>Your Order Container is Empty</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductList;
