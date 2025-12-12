import React, { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FaAngleDoubleUp } from "react-icons/fa";

const Footer = () => {
  const handleScreenVisual = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.nav_footer_main}>
      <div onClick={handleScreenVisual} className={styles.backtoTop}>
        <p> back to top</p>
        <span>
          <FaAngleDoubleUp />
        </span>
      </div>
      <div id={styles.nav_footer_contactPage}>
        <div className={styles.footer_aboutSection}>
          <div className={styles.footer_aboutSection_marginTop}>
            <div className={styles.footer_knowAbout}>
              <div className={styles.footer_sameClass}>Know About Us</div>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/sitemap">Sitemap</Link>
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
            {/* Customer Service */}
            <div className={styles.footer_customerService}>
              <div className={styles.footer_sameClass}>Customer Service</div>
              <Link to="/faq">FAQs</Link>
              <Link to="/orders">Track Order</Link>
              <Link to="/returns">Returns & Refunds</Link>
              <Link to="/shipping">Shipping Info</Link>
              <Link to="/support">Support</Link>
            </div>
            <div className={styles.footer_letUsHelp}>
              <div className={styles.footer_sameClass}>Lets Us Help you</div>
              <Link></Link>
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
              <span>🌍 CarticoEW Global</span>
            </div>
            <div>
              <p>
                Operating in multiple countries & languages. Expanding worldwide
                🌐
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id={styles.nav_footer_copyRights}>
        <div className={styles.footer_copyRights_marginTop}>
          © {new Date().getFullYear()} CarticoEW. All Rights Reserved.
          <Link to="/privacy" className={styles.footer_legal}>
            Privacy Policy
          </Link>{" "}
          |
          <Link to="/terms" className={styles.footer_legal}>
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
