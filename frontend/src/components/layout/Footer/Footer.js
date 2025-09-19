import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FaAngleDoubleUp } from "react-icons/fa";
const Footer = () => {
  return (
    <div className={styles.nav_footer_main}>
      <a href="#navmenu_mainContainer" style={{ textDecoration: "none" }}>
        <div id={styles.nav_footer_backToTop}>
          <span>
            back to top
            <FaAngleDoubleUp style={{ position: "relative", left: "25px" }} />
          </span>
        </div>
      </a>
      <div id={styles.nav_footer_contactPage}>
        <div className={styles.footer_aboutSection}>
          <div className={styles.footer_aboutSection_marginTop}>
            <div className={styles.footer_knowAbout}>
              <div className={styles.footer_sameClass}>Know About Us</div>
              <div>About us</div>
            </div>
            <div className={styles.footer_socialUrl}>
              <div className={styles.footer_sameClass}>Social Url</div>
              <a href="https://www.instagram.com/freaky_fred_creep08/">
                Instagram
              </a>
              <a href="https://www.facebook.com/profile.php?id=100007402210241">
                Facebook
              </a>
              <a href="https://www.linkedin.com/in/sahil-thakur-735181203/">
                LinkedIn
              </a>
            </div>
            <div>
              <div className={styles.footer_letUsHelp}>
                <div className={styles.footer_sameClass}>Lets Us Help you</div>
                <Link></Link>
              </div>
            </div>
            <div className={styles.footer_comingPage}>
              <div className={styles.footer_sameClass}>Coming...</div>
              <p>Coming Soon..</p>
            </div>
          </div>
        </div>
        <div className={styles.footer_totalCountry_bussiness}>
          <div className={styles.footer_totalCountry_marginTop}>
            <div>
              <span>Logo</span>
              <span>Language</span>
            </div>
            <div>
              Total Countries Bussiness and Languages here all the countries and
              cities where our bussiness are runnings
            </div>
          </div>
        </div>
      </div>
      <div id="nav_footer_copyRights">
        <div className={styles.footer_copyRights_marginTop}> Copy Rights </div>
      </div>
    </div>
  );
};

export default Footer;
