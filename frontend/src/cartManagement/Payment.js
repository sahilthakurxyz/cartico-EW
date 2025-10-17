import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./Payment.module.css";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FaRegCreditCard } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdVpnKey } from "react-icons/md";
import MetaData from "../components/layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { clearError, createNewOrder } from "../redux/actions/orderAction";
import { attachTokenToRequests, axiosInstance } from "../constants.js";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();
  const navigate = useNavigate();
  const payBtn = useRef(null);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo?.subTotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.shippingCharges,
    totalPrice: orderInfo?.payTotalAmount,
    _id: orderInfo?._id,
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      attachTokenToRequests();

      const { data } = await axiosInstance.post(
        "/api/ecommerce/v1/payment/process",
        {
          amount: Math.round(orderInfo?.payTotalAmount * 100),
          description: `Order #${orderInfo?._id}-${user?.name}`,
          orderId: orderInfo?._id,
          address: {
            name: user?.name,
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.pinCode,
            country: shippingInfo.country,
          },
        }
      );
      const client_secret = data?.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe?.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error("Payment Failed");
        navigate("/payment/failed", {
          state: { errorMessage: result.error.message },
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert.success(`Payment ${result.paymentIntent.status}`);
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createNewOrder(order));
          navigate("/success");
        } else {
          alert.error("there is an issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      <MetaData title="Payment Details" />
      <CheckoutSteps activeStep={2} />
      <div className={styles["payment-main-container"]}>
        <form className={styles["payment-form"]} onSubmit={handleFormSubmit}>
          <Typography>Cart Info</Typography>
          <div>
            <FaRegCreditCard />
            <CardNumberElement className={styles["paymentInput"]} />
          </div>
          <div>
            <CiCalendarDate />
            <CardExpiryElement className={styles["paymentInput"]} />
          </div>
          <div>
            <MdVpnKey />
            <CardCvcElement className={styles["paymentInput"]} />
          </div>
          <input
            type="submit"
            ref={payBtn}
            value={`Pay - ${
              orderInfo && Math.round(orderInfo?.payTotalAmount)
            }`}
            className={styles["paymet-form-button"]}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
