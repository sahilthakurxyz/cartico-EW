import React, { Fragment, useEffect } from "react";
import styles from "./MyOrders.module.css";
import { MdOutlineLaunch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearError2, myOrders } from "../redux/actions/orderAction";
import { DataGrid } from "@mui/x-data-grid";
import { useAlert } from "react-alert";
import Loader from "../components/layout/Loader";
import { Box, Typography } from "@mui/material";
import ScreenVisual from "../ScreenVisual";
import MetaData from "../components/layout/MetaData";
import { Link } from "react-router-dom";
const MyOrders = () => {
  const greenColor = styles["greenColor"];
  const redColor = styles["redColor"];
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, orders } = useSelector((state) => state.getOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "_id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.2,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? styles.greenColor : styles.redColor,
    },
    {
      field: "itemQty",
      headerName: "Items Qty",
      minWidth: 80,
      flex: 0.2,
      type: "number",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 0.2,
      renderCell: (params) => (
        <Link to={params.row._id}>
          <MdOutlineLaunch />
        </Link>
      ),
    },
  ];

  const rows = orders?.map((item) => ({
    _id: item._id,
    status: item.orderStatus,
    itemQty: item.orderItems.length,
    amount: item.totalPrice,
  }));

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError2());
    }
  }, [dispatch, alert, error]);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles["myOrder-main"]}>
          <ScreenVisual />
          <MetaData title={`${user.name}'s orders`} />
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Typography sx={{ textAlign: "center", mt: 3, mb: 2 }}>
              Manage Orders
            </Typography>
            <div className={styles["myOrders-page"]}>
              <div className={styles["dataGridWrapper"]}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row._id}
                  pageSizeOptions={[10, 100]}
                  disableRowSelectionOnClick
                  className={styles["data-grid-main-container"]}
                  autoHeight
                />
              </div>
            </div>
            <Typography className={styles["heading-owner"]}>
              {`${user.name}'s Orders`}
            </Typography>
          </Box>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
