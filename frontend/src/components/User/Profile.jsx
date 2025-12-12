import React, { useEffect } from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { useNavigate, Link } from "react-router-dom";
import ScreenVisual from "../../ScreenVisual";
import MetaData from "../layout/MetaData";
import defaultImg from "../../images/default.jpg";
const Profile = () => {
  const navigate = useNavigate();
  const { loading, user, auth } = useSelector((state) => state.user);
  useEffect(() => {
    if (auth === false && loading === false) {
      navigate("/login");
    }
  }, [navigate, auth, loading]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles["profile"]}>
          {auth && (
            <div>
              <MetaData title={`${user.name}'s Profile`} />
              <ScreenVisual />

              <div className={styles["profile-container"]}>
                <div className={styles["profile-container-left"]}>
                  <div className={styles["profile-user-info"]}>
                    <p className={styles["left-heading"]}>Profile</p>
                    <div>
                      <div className={styles["left-user-image"]}>
                        <img
                          src={user?.avatar?.url}
                          onError={(event) => (event.target.src = defaultImg)}
                          alt={"profile"}
                        />
                      </div>
                      <Link to="/update/profile">
                        <button className={styles["left-user-info-button"]}>
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles["profile-container-right"]}>
                  <div className={styles["profile-user-details"]}>
                    <div>
                      <h4 className={styles["details-heading"]}>Full Name</h4>
                      <p className={styles["details-text"]}>{user?.name}</p>
                    </div>
                    <div>
                      <h4 className={styles["details-heading"]}>Email</h4>
                      <p className={styles["details-text"]}>{user?.email} </p>
                    </div>
                    <div>
                      <h4 className={styles["details-heading"]}>Role</h4>
                      <p
                        className={
                          user.role === "admin"
                            ? styles["green"]
                            : styles["black"]
                        }
                      >
                        {user.role}{" "}
                      </p>
                    </div>
                    <div>
                      <h4 className={styles["details-heading"]}>Joined On </h4>
                      <p className={styles["details-text"]}>
                        {String(user?.createdAt).substring(0, 10)}
                      </p>
                    </div>
                    <div className={styles["profiles-buttons"]}>
                      <Link to="/orders">
                        <button className={styles["user-profile-button"]}>
                          My Orders
                        </button>
                      </Link>
                      <Link to="/update/password">
                        <button className={styles["user-profile-button"]}>
                          Change Password
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
