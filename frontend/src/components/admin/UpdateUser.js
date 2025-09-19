import React, { Fragment, useEffect, useState } from "react";
import styles from "./UpdateUser.module.css";
import ScreenVisual from "../../ScreenVisual";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Person2Icon from "@mui/icons-material/Person2";
import CategoryIcon from "@mui/icons-material/Category";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { getUserDetails, updateUser } from "../../redux/actions/userAction";
import {
  loadUserClearError,
  updateUserClearError,
  updateUserReset,
  userDetailsClearError,
} from "../../redux/reducers/UserReducer";
const UpdateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(
    (state) => state.adminUserDetails
  );
  const {
    error: updateError,
    isUpdated,
    loading: updateLoading,
    message,
  } = useSelector((state) => state.adminUpdateDeleteUser);
  const {
    loading: userLoading,
    error: userError,
    user: loadUser,
  } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    if (loadUser._id === id && role === "user") {
      window.alert(
        "As an admin, you're responsible for maintaining access levels. Downgrading your own role to 'user' is not permitted. Please proceed with caution. We're noticing your irresponsible behavior, which may affect your performance."
      );
      return;
    }
    dispatch(updateUser(id, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(userDetailsClearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(updateUserClearError());
    }
    if (isUpdated) {
      alert.success(message);
      dispatch(updateUserReset());
      navigate("/admin/users");
    }
    if (userError) {
      dispatch(loadUserClearError());
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [
    dispatch,
    alert,
    error,
    user,
    updateError,
    isUpdated,
    message,
    navigate,
    userError,
  ]);
  useEffect(() => {
    if (loadUser.role === "admin") {
      dispatch(getUserDetails(id));
    }
  }, [dispatch, id, loadUser.role]);
  return (
    <Fragment>
      {loading || userLoading ? (
        <Fragment>
          <Loader />
        </Fragment>
      ) : (
        <div className={styles["create-product-main"]}>
          <ScreenVisual />
          <MetaData title="Authenicaton ---Admin" />
          <div className={styles["create-product-container"]}>
            <div className={styles["create-product"]}>
              <form
                className={styles["create-product-form"]}
                encType="multipart/form-data"
                onSubmit={handleFormSubmit}
              >
                <h1 className={styles["heading"]}>
                  Change User Authentication
                </h1>
                <div>
                  <Person2Icon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <CategoryIcon />
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <option value="">Select Role</option>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <button
                  className={styles["create-productBtn"]}
                  disabled={
                    updateLoading
                      ? true
                      : false || user.role === ""
                      ? true
                      : false
                  }
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateUser;
