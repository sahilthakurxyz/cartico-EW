import React, { useEffect, useState } from "react";
import styles from "./NavMenu.module.css";
import companyLogo from "../../../images/companylogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import UserProfile from "./UserProfile.js";
import { useDispatch, useSelector } from "react-redux";
import { FaProductHunt } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { GoSignIn } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../../../redux/actions/userAction.js";
import { useAlert } from "react-alert";

const NavMenu = () => {
  const [keyword, setKeyword] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  const { cartItems } = useSelector((state) => state?.cart || []);
  const { user, loading, auth } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
  const openMobileNavigation = () => {
    setToggle(!toggle);
  };
  const closeAlways = () => {
    setToggle(false);
  };
  useEffect(() => {
    const handleWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  const handleLogOut = () => {
    if (!auth) {
      alert.error("You're not logged In");
      return;
    }
    if (user) {
      dispatch(logout());
      alert.success("Logout Successfully");
    }
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <div>
      <header className={styles["navmenu_container"]}>
        <div className={styles["logo"]} onClick={closeAlways}>
          <Link to="/">
            <img src={companyLogo} alt="company-logo" />
          </Link>
        </div>
        {windowWidth < 576 && (
          <div onClick={openMobileNavigation}>
            <TiThMenu className={styles["hamburger"]} />
          </div>
        )}
        {toggle && (
          <div className={styles["mobile-navigation"]}>
            <div>
              <div onClick={openMobileNavigation}>
                <Link to="/products">
                  <FaProductHunt />
                  <p>Products</p>
                </Link>
              </div>
              <div onClick={openMobileNavigation}>
                <Link to="/cart">
                  <TiShoppingCart />
                  <p>Cart</p>
                </Link>
              </div>
              <div onClick={openMobileNavigation}>
                <Link to="/admin/dashboard">
                  <MdOutlineLocalGroceryStore />
                  <p>Dashboard</p>
                </Link>
              </div>
              <div onClick={openMobileNavigation}>
                <Link>
                  <GoSignIn />
                  <p onClick={handleLogOut}>Sign In</p>
                </Link>
              </div>
              <div onClick={openMobileNavigation}>
                <Link to="/login">
                  <IoIosLogOut />
                  <p>Login</p>
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className={styles["navigation-container"]}>
          <nav className={styles["navigation"]}>
            <div className={styles["nav-links"]}>
              <Link to="/products">Products</Link>
            </div>
            <form onSubmit={handleSubmitSearch}>
              <div className={styles["search-container"]}>
                <label htmlFor="search" className={styles["input-wrapper"]}>
                  <input
                    type="text"
                    placeholder="Search..."
                    id="search"
                    onChange={(e) => setKeyword(e.target.value)}
                    className={styles["search-input"]}
                  />
                  <button type="submit" className={styles["search-icon"]}>
                    <FaSearch />
                  </button>
                </label>
              </div>
            </form>
            <div className={styles["nav-links"]}>
              <Link to="/cart">
                <MdOutlineLocalGroceryStore className={styles["cart"]} />
                <p>{cartItems?.length}</p>
              </Link>
            </div>
            <div>
              <UserProfile />
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavMenu;
