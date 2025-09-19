import React, { Fragment, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "./Sidebar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import ScreenVisual from "../../ScreenVisual";
import MetaData from "../layout/MetaData";
import { Chart as ChartJS, registerables } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { adminOrders } from "../../redux/actions/orderAction";
import { useAlert } from "react-alert";
import { getAdminProduct } from "../../redux/actions/productAction";
import Loader from "../layout/Loader";
import { adminAllUsersAction } from "../../redux/actions/userAction";
const Dashboard = () => {
  const { products, loading } = useSelector((state) => state.adminProducts);
  const { orders } = useSelector((state) => state.adminAllOrders);
  const { users } = useSelector((state) => state.adminAllUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
  let totalPrice = 0;
  orders &&
    orders.forEach((item) => {
      totalPrice += item.totalPrice;
    });

  const dispatch = useDispatch();
  const alert = useAlert();
  ChartJS.register(...registerables);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        data: [0, totalPrice],
        backgroundColor: "#3f12e0",
        hoverBackgroundColor: ["#c812e0"],
        borderColor: "green",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: "x",
    plugins: {
      title: {
        display: true,
        text: "Monthly Order Status",
      },
      legend: {
        display: true,
      },
    },
  };
  const doughnutState = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        backgroundColor: ["#ba25db", "red"],
        hoverBackgroundColor: ["#0dd62e", "#d60d1e"],
        data: [products.length - outOfStock, outOfStock],
      },
    ],
  };
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(adminOrders());
    dispatch(adminAllUsersAction());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles["dashboard-main"]}>
          <ScreenVisual />
          <MetaData title="Admin Dashboard" />
          <Sidebar />
          <div className={styles["dashboard-container"]}>
            <Typography component="h1">Dashboard</Typography>
            <div className={styles["dashboardSummery"]}>
              <div className={styles["dashboard-summery-1"]}>
                <p>Revenue </p> :<span>₹ {totalPrice.toFixed(1)}</span>
              </div>
              <div className={styles["dashboard-summery-2"]}>
                <div className={styles["first"]}>
                  {" "}
                  <Link to="/admin/users">
                    <p>Users</p>
                    <span>{users && users.length}</span>
                  </Link>
                </div>
                <div className={styles["second"]}>
                  <Link to="/admin/products">
                    <p>Products</p>
                    <span>{products && products.length} </span>
                  </Link>
                </div>
                <div className={styles["third"]}>
                  <Link to="/admin/orders">
                    <p>Orders</p>
                    <span>{orders && orders.length}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles["line-chart"]}>
              <Line data={lineState} options={options} />
            </div>
            <div className={styles["doughnut-chart"]}>
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
