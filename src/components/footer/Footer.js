import React from "react";
import styles from "./Footer.module.scss"
import ScrollToTop from "react-scroll-to-top";
const date = new Date();
const Year = date.getFullYear();
const Footer = () => {
  return (
    <>
      <ScrollToTop smooth top="10px" />
      <div className={styles.footer}>
        &copy;{Year} All Right Reserved

      </div></>

  );
};

export default Footer;
