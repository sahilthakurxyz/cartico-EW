import React, { useEffect, useState } from "react";
import styles from "./ResetPassword.module.css";
import { IoIosEyeOff } from "react-icons/io";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { IoIosEye } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { RiLockPasswordFill } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import ButtonLoader from "../layout/ButtonLoader";
import { resetPassword } from "../../redux/actions/userAction";
import { clearError } from "../../redux/reducers/ProfileReducer";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfimPassword] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const { token } = useParams();
  const { loading, error, success } = useSelector(
    (state) => state.forgetPassword
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Password Update Successfully");
      dispatch(clearError());
      navigate("/login");
    }
  }, [error, alert, success, navigate, dispatch]);
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };
  return (
    <>
      <div>
        <MetaData title="Reset Password" />
        <div className={styles["resetPassword-container"]}>
          <div className={styles["resetPassword-box"]}>
            <div className={styles["resetPassword-heading"]}>
              Reset Password
            </div>
            <form
              className={styles["resetPassword-form"]}
              onSubmit={handleResetPasswordSubmit}
            >
              <div className={styles["reset-password"]}>
                <LockOpenIcon />
                <input
                  type={visible1 ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                <div
                  className={styles["reset-password-eye"]}
                  onClick={() => {
                    setVisible1(!visible1);
                  }}
                >
                  {visible1 ? <IoIosEye /> : <IoIosEyeOff />}
                </div>
              </div>
              <div className={styles["reset-password"]}>
                <RiLockPasswordFill />

                <input
                  type={visible2 ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfimPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <div
                  className={styles["reset-password-eye"]}
                  onClick={() => {
                    setVisible2(!visible2);
                  }}
                >
                  {visible2 ? <IoIosEye /> : <IoIosEyeOff />}
                </div>
              </div>
              <button
                type="submit"
                className={styles["submit-btn-resetPassword"]}
              >
                {loading ? <ButtonLoader color={"blue"} /> : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
