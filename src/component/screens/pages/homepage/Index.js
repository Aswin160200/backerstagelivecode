import React, { useState } from "react";
import Styles from "./Index.module.css";
import HomePageHeaderLogo from "../../../assets/images/HomePageHeaderLogo.png";
import UserIconTwo from "../../../assets/images/UserIconTwo.png";
import ProjectsImage from "../../../assets/images/ProjectsImage.png";
import InvestorsImage from "../../../assets/images/InvestorsImage.png";

import CoProducersImage from "../../../assets/images/CoProducersImege.png";
import AdminIcon from "../../../assets/images/AdminIcon.png";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <div className={Styles.HomePageMainContainer}>
      <div className={Styles.HomePageHeaderContainer}>
        <img
          src={HomePageHeaderLogo}
          alt=""
          className={Styles.HomePageHeaderLogoImage}
        />
        <img src={UserIconTwo} alt="" />
      </div>
      <div className={Styles.HomePageCartContainerLayer}>
        <div className={Styles.HomePageCartContainer}>
          <Link className={Styles.HomePageCartContent} to="/projects">
            <div>
              <img src={ProjectsImage} alt="" />
              <p>Projects</p>
            </div>
          </Link>
          <Link className={Styles.HomePageCartContent} to="/investor">
            <div>
              <img src={InvestorsImage} alt="" />
              <p>Investors</p>
            </div>
          </Link>
          <Link className={Styles.HomePageCartContent} to="/co_producers">
            <div>
              <img src={CoProducersImage} alt="" />
              <p>Co-producers</p>
            </div>
          </Link>
          <Link className={Styles.HomePageCartContent} to="/admin">
            <div>
              <img src={AdminIcon} alt="" />
              <p>Admin User</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
