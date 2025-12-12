import React, { useEffect, useState } from "react";
import styles from "./ForgetPassword.module.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import ButtonLoader from "../layout/ButtonLoader";
import { useAlert } from "react-alert";
import { forgetPassword } from "../../redux/actions/userAction";
import { clearError } from "../../redux/reducers/ProfileReducer";
const ForgetPassword = () => {
  const { error, loading, message } = useSelector(
    (state) => state.forgetPassword
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const handleforgetPasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgetPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
    }
  });
  return (
    <>
      <div>
        <MetaData title="Forget Password" />
        <div className={styles["forgetPassword-container"]}>
          <div className={styles["forgetPassword-box"]}>
            <div className={styles["forgetPassword-heading"]}>
              Forget Password
            </div>
            <form
              className={styles["forgetPassword-form"]}
              onSubmit={handleforgetPasswordSubmit}
            >
              <div className={styles["forget-password"]}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter Your Email"
                />
              </div>

              <button
                type="submit"
                className={styles["submit-btn-forgetPassword"]}
              >
                {loading ? <ButtonLoader color={"blue"} /> : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
