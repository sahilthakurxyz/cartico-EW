import React, { Fragment, useEffect, useState } from "react";
import styles from "./UpdateOrder.module.css";
import { Typography, Button } from "@material-ui/core";
import CategoryIcon from "@mui/icons-material/Category";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import MetaData from "../layout/MetaData";
import ScreenVisual from "../../ScreenVisual";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import {
  clearError3,
  getOrderDetails,
  updateOrder,
} from "../../redux/actions/orderAction";
import Loader from "../layout/Loader";

import {
  updateOrderClearError,
  updateOrderReset,
} from "../../redux/reducers/orderReducer";
import { removeAllFromCart } from "../../redux/reducers/cartReducer";
const UpdateOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const greenColor = styles["greenColor"];
  const redColor = styles["redColor"];
  const blueColor = styles["blueColor"];
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const {
    error: updateError,
    loading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.adminOrderUpdate);
  // const { shippingInfo, orderItems, user } = order;
  const { user = {} } = order || {};
  // let address = "";
  const shippingInfo = order?.shippingInfo;
  const orderItems = order?.orderItems;
  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata", // Set the time zone to IST
  };
  let createProductTime = "";
  if (order) {
    const date = new Date(order.paidAt);
    createProductTime = date.toLocaleString("en-IN", options);
  }
  if (order?.orderStatus && order.orderStatus === "Shipped") {
    dispatch(removeAllFromCart());
  }
  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearError3());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(updateOrderClearError());
    }
    if (isUpdated) {
      alert.success("Process Updated Successfully");
      dispatch(updateOrderReset());
    }
  }, [dispatch, alert, error, updateError, isUpdated, updateLoading, id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };
  return (
    <Fragment>
      <MetaData title="Update Order Process" />

      <ScreenVisual />
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <div className={styles["update-order-main"]}>
          <Sidebar />
          <div className={styles["confirm-order-container"]}>
            <div>
              <div className={styles["confirm-shipping-area"]}>
                <Typography>Shipping Info</Typography>
                {order && shippingInfo && (
                  <div className={styles["confirm-shipping-area-box"]}>
                    <div>
                      <p>Name:</p>
                      <span>{user?.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>{shippingInfo?.phoneNo}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span className={styles["address"]}>{address}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles["orderDetails-shipping-area"]}>
                <Typography>Payment Info</Typography>
                <div className={styles["orderDetails-shipping-area-box"]}>
                  {order && order?.paymentInfo && (
                    <div>
                      <p
                        className={
                          order.paymentInfo?.status === "succeeded"
                            ? greenColor
                            : redColor
                        }
                      >
                        {order.paymentInfo?.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID YET"}
                      </p>
                    </div>
                  )}
                  <div>
                    <p>Order Created At</p>
                    <span>{createProductTime}</span>
                  </div>
                  {order && order.taxPrice && (
                    <div>
                      <p>Amount:</p>

                      <span>
                        included Tax ({order?.taxPrice.toFixed(0)}):{" "}
                        {order.totalPrice && order?.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles["order-update-orderStatus"]}>
                <Typography>Order Status</Typography>
                <div className={styles["orderDetailsContainerBox"]}>
                  <div>
                    <p
                      className={
                        order?.orderStatus && order.orderStatus === "Delivered"
                          ? greenColor
                          : redColor ||
                            (order?.orderStatus &&
                              order.orderStatus === "Shipped")
                          ? blueColor
                          : redColor
                      }
                    >
                      {order?.orderStatus && <span>{order.orderStatus}</span>}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles["orderDetails-cartItems-container"]}>
                <Typography>Cart Items:</Typography>
                <div className={styles["orderDetails-cartItems-box"]}>
                  {order && orderItems ? (
                    orderItems.map((item) => (
                      <div key={item.productId}>
                        <img src={item.image} alt="" />
                        <Link className={styles["link"]}>
                          <div>
                            <MdOutlineDriveFileRenameOutline />
                            <p className={styles["name"]}>{item.name}</p>
                            <div className={styles["detail"]}>
                              <p className={styles["quantity"]}>
                                {item.quantity}
                              </p>{" "}
                              <p> X</p> <p>{item.price.toFixed(2)}</p> ={" "}
                              <p>{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div>Cart is Empty</div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div
                className={styles["orderSummary"]}
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <Typography>Order Summery</Typography>
                {order && (
                  <form
                    className={styles["create-product-form"]}
                    onSubmit={handleFormSubmit}
                  >
                    <div>
                      <CategoryIcon />
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Process Steps</option>
                        {order.orderStatus &&
                          order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>
                    <Button className={styles["buttonBtn"]} type="submit">
                      Process
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateOrder;
