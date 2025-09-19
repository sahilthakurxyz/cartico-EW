import React, { Fragment, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";
import { loginClearError } from "../../redux/reducers/UserReducer";
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, auth } = useSelector((state) => state.user);

  // console.log(loading, "loading");
  // console.log(auth, "isAuthen");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const redirect = location.state?.redirect || "/account";
  useEffect(() => {
    if (error) {
      dispatch(loginClearError());
    }
  }, [dispatch, error]);
  useEffect(() => {
    if (auth) {
      navigate(redirect);
    }
  }, [auth, navigate, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="Access Your Account" />
          <div className={styles["login-container"]}>
            <div className={styles["login-box"]}>
              <div className={styles["login-heading"]}>LOGIN </div>
              <form
                className={styles["login-form"]}
                onSubmit={handleLoginSubmit}
              >
                <div className={styles["login-email"]}>
                  <MdAttachEmail />
                  <input
                    type="email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    value={loginEmail}
                    required
                    placeholder="Enter Email"
                  />
                </div>
                <div className={styles["login-password"]}>
                  <RiLockPasswordFill />
                  <input
                    type={visible ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Password..."
                  />
                  <div
                    className={styles["login-password-eye"]}
                    onClick={() => {
                      setVisible(!visible);
                    }}
                  >
                    {visible ? <IoIosEye /> : <IoIosEyeOff />}
                  </div>
                </div>
                <Link to="/forget/password">Forget Password ?</Link>
                <button type="submit" className={styles["submit-btn-login"]}>
                  login
                </button>
                <Link to="/register">You Don't have an Account ? Register</Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
