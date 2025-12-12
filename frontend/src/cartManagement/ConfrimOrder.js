import React, { Fragment } from "react";
import styles from "./ConfirmOrder.module.css";
import MetaData from "../components/layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import ScreenVisual from "../ScreenVisual";
const ConfrimOrder = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const subTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const payTotalAmount = subTotal + shippingCharges + tax;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      payTotalAmount,
      _id: new Date().toString(24).substring(0, 24).split(" ").join("-"),
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order Details" />
      <CheckoutSteps activeStep={1} />
      <ScreenVisual />
      <div className={styles["confirm-order-container"]}>
        <div>
          <div className={styles["confirm-shipping-area"]}>
            <Typography>Shipping Info</Typography>
            <div className={styles["confirm-shipping-area-box"]}>
              <div>
                <p>Name:</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p>Phone:</p>
                <p>{shippingInfo.phoneNo}</p>
              </div>
              <div>
                <p>Address:</p>
                <p>{address}</p>
              </div>
            </div>
          </div>
          <div className={styles["confrim-cartItems-container"]}>
            <Typography>Cart Items:</Typography>
            <div className={styles["confirm-cartItems-box"]}>
              {cartItems?.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.productId}>
                    <div className={styles["image-container"]}>
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className={styles["details"]}>
                      <Link className={styles["link"]} to="/cart">
                        <MdOutlineDriveFileRenameOutline />
                        <p className={styles["name"]}>{item.name}</p>
                      </Link>
                      <div className={styles["detail"]}>
                        <div>
                          <p> {item.quantity}</p> <span>x</span>
                        </div>
                        <div>
                          <p>{item.price.toFixed(1)}</p> <span>=</span>{" "}
                        </div>
                        <p>{item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles["empty-card"]}>Cart is Empty</div>
              )}
            </div>
          </div>
        </div>
        <div>
          {cartItems.length > 0 && (
            <div className={styles["orderSummary"]}>
              <Typography>Order Summery</Typography>
              <div>
                <div>
                  <p>Subtotal:</p>
                  <span>₹{subTotal.toFixed(2)}</span>
                </div>
                <div>
                  <p>Shipping Charges:</p>
                  <span>₹{shippingCharges}</span>
                </div>
                <div>
                  <p>GST:</p>
                  <span>₹{tax.toFixed(1)}</span>
                </div>
              </div>

              <div className={styles["orderSummaryTotal"]}>
                <p>
                  <b>Total:</b>
                </p>
                <span>₹{payTotalAmount.toFixed(2)}</span>
              </div>

              <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ConfrimOrder;
