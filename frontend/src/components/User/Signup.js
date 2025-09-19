import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Person2Icon from "@mui/icons-material/Person2";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";
import { registerClearError } from "../../redux/reducers/UserReducer";
import { register } from "../../redux/actions/userAction";

const Signup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "/userprofile.png",
    avatarPreview: "/userprofile.png",
  });
  const [visible, setVisible] = useState(false);
  const { name, email, password, avatarPreview } = user;
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(registerClearError());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, loading]);
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUser({
            ...user,
            avatarPreview: reader.result,
            avatar: e.target.files[0],
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", user.avatar);
    dispatch(register(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Create an Account" />
          <div className={styles["signup-container"]}>
            <div className={styles["signup-box"]}>
              <div className={styles["sigup-heading"]}>REGISTER</div>
              <form
                className={styles["signup-form"]}
                encType="multipart/form-data"
                onSubmit={handleRegisterSubmit}
              >
                <div className={styles["signup-name"]}>
                  <Person2Icon />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className={styles["signup-email"]}>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className={styles["signup-password"]}>
                  <LockOpenIcon />
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <div
                    className={styles["signup-password-eye"]}
                    onClick={() => {
                      setVisible(!visible);
                    }}
                  >
                    {visible ? <IoIosEye /> : <IoIosEyeOff />}
                  </div>
                </div>
                <div id={styles["registerImage"]}>
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <button
                  type="submit"
                  className={styles["submit-btn-signup"]}
                  name="Register"
                >
                  Register
                </button>
                <Link to="/login">You Already have an Account ? Login</Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signup;
