import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import OpenUserProfile from "./OpenUserProfile.js";
import { useSelector } from "react-redux";
import defaultImg from "../../../images/default.jpg";
const UserProfile = () => {
  const { user, loading, auth } = useSelector((state) => state?.user);
  const [openOption, setOpenOption] = useState(false);
  const handleOpenProfile = () => {
    setOpenOption(true);
  };
  return (
    <>
      {!loading && (
        <div>
          {auth ? (
            <div tabIndex="0">
              <div
                className={styles["user-profile"]}
                onClick={handleOpenProfile}
              >
                <img
                  src={user?.avatar?.url}
                  onError={(event) => (event.target.src = defaultImg)}
                  alt="profile"
                />
                <p>{user.email}</p>
              </div>
            </div>
          ) : (
            <div
              className={styles["no-user-profile"]}
              onClick={handleOpenProfile}
            >
              <img src={"/userprofile.png"} alt="default" />
              <p>Sign In</p>
            </div>
          )}

          {openOption && (
            <OpenUserProfile
              onClose={() => setOpenOption(false)}
              user={user}
              auth={auth}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
