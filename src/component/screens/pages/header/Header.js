import React, { useState } from "react";
import Styles from "./Index.module.css";
import { useHistory, useNavigate } from "react-router-dom";
import HeaderImage from "../../../assets/images/HeaderImage.png";
import backarrowOne from "../../../assets/images/backarrowOne.png";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import questionImage from "../../../assets/images/questionImage.png";
import personIcon from "../../../assets/images/personIcon.png";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const HeaderPage = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogOut = () => {
    sessionStorage.removeItem("loggedInUser");
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <div className={Styles.HeaderPageMainContainer}>
      <div className={Styles.HeaderPageNavContainer}>
        <div className={Styles.HeaderPageNavContainerLeft}>
          <img src={HeaderImage} alt="logo" className={Styles.HeaderPageLogo} />
          <Link className="Link" to="/homepage">
            <p>
              <img
                src={backarrowOne}
                alt="logo"
                className={Styles.HeaderPageBackIcon}
              />
              Menu
            </p>
          </Link>
        </div>
        <div className={Styles.HeaderPageNavContainerRight}>
          <div className={Styles.HeaderPagesearch}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search..." }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
          <p className={Styles.HeaderPagesProducerText}>
            {storedUser.firstname} {storedUser.lastname}
          </p>
          <img src={personIcon} alt="" onClick={handleClick} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleCloseLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
