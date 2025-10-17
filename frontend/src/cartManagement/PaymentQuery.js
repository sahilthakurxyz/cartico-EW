import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import { attachTokenToRequests, axiosInstance } from "../constants";
const PaymentQuery = () => {
  const [continueToggle, setContinueToggle] = useState(false);
  const [toPayment, setToPayment] = useState(false);

  const [stripeApiKey, setStripeApiKey] = useState("");

  const toggleToPayment = () => {
    setToPayment(true);
  };
  const toggleToContiue = () => {
    setContinueToggle(true);
  };
  const getStripeApiKey = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;
    attachTokenToRequests();
    try {
      const { data } = await axiosInstance.get(
        `/api/ecommerce/v1/stripeApiKey`
      );

      setStripeApiKey(data?.stripeKey);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response);
      } else {
        console.error("Error fetching Stripe API key:", error);
      }
    }
  };
  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <div className={styles["container"]}>
      {!continueToggle && (
        <div className={styles["continue-payment"]}>
          <div className={styles["guidelines"]}>
            <p className={styles["guidelines-text"]}>
              Please ensure that all the information provided is accurate.
            </p>
            <p className={styles["guidelines-text"]}>
              Payments made in test mode will not be processed or charged.
            </p>
            <p className={styles["guidelines-text"]}>
              Contact customer support for any assistance or queries.
            </p>
            <p>
              <a
                href="https://docs.stripe.com/testing#regulatory-cards"
                target="_blank"
              >
                This Link for Payment details
              </a>
            </p>
          </div>
          <button className={styles["toggle-button"]} onClick={toggleToContiue}>
            Continue for Payment
          </button>
        </div>
      )}
      {continueToggle && !toPayment && (
        <div className={styles["toggleTo-payment"]}>
          <div className={styles["dynamic-div"]}>
            <button
              className={styles["cross-button"]}
              onClick={toggleToPayment}
            >
              X
            </button>
            <p>
              This is test mode payment. It is just for testing purposes before
              we launch our payment method publicly.
            </p>
          </div>
        </div>
      )}
      {toPayment && (
        <div>
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentQuery;
