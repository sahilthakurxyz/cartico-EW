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
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import ScreenVisual from "../../ScreenVisual";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import {
  adminOrdersClearError,
  deleteOrderClearError,
  deleteOrderReset,
} from "../../redux/reducers/orderReducer";
import { adminOrders, deleteOrder } from "../../redux/actions/orderAction";
const OrderList = () => {
  const greenColor = "greenColor";
  const redColor = "redColor";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alertError = useAlert();
  const { loading, error, orders } = useSelector(
    (state) => state.adminAllOrders
  );
  const {
    error: deleteError,
    isDeleted,
    loading: deleteLoading,
  } = useSelector((state) => state.adminOrderDelete);
  const deleteOrderHandler = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Order?"
    );
    if (confirmDelete) {
      dispatch(deleteOrder(id));
    } else {
      return;
    }
  };
  let columns = [];
  if (orders) {
    columns = [
      { field: "id", headersName: "Order Id", minWidth: 240 },
      {
        field: "status",
        headersName: "Status",
        minWidth: 200,
        cellClassName: (params) => {
          return params.row.status === "Delivered" ? greenColor : redColor;
        },
      },
      {
        field: "itemQty",
        headersName: "Items Qty",
        minWidth: 200,
        type: "number",
      },
      {
        field: "amount",
        headersName: "Amount",
        minWidth: 200,
        type: "number",
      },
      {
        field: "actions",
        HeadersName: "Actions",
        type: "number",
        minWidth: 200,

        renderCell: (params) => {
          return (
            <Fragment>
              <Link to={`/admin/update/order/${params.row.id}`}>
                <EditIcon />
              </Link>
              <Button onClick={() => deleteOrderHandler(params.row.id)}>
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  }
  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemQty: item.orderItems?.length,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      alertError.error(error);
      dispatch(adminOrdersClearError());
    }
    if (deleteError) {
      alertError.error(deleteError);
      dispatch(deleteOrderClearError());
    }
    if (isDeleted) {
      alertError.success("Order Deleted SuccessFully");
      dispatch(deleteOrderReset());
    }
    dispatch(adminOrders());
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
          <MetaData title="All Orders -- Admin" />
          <div className="productList-main">
            <Sidebar />
            <div>
              <Typography>All Orders</Typography>
              {orders.length > 0 ? (
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

export default OrderList;
