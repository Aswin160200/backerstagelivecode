import React, { useState } from "react";
import Styles from "./Index.module.css";
import LoginImageTwo from "../../../assets/images/LoginImageTwo.jpg";
import HeaderImage from "../../../assets/images/HeaderImage.png";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useHistory, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

export const InputStyled = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 50px;
    border-color: #686e8c;
    color: #686e8c;
    height: 46px;
    font-size: 14px;

    & fieldset {
      border-color: #686e8c;
    }

    &:hover fieldset {
      border-color: #686e8c;
    }

    &.Mui-focused fieldset {
      border-color: #686e8c;
      border: 1px solid #686e8c;
    }

    &.Mui-active fieldset {
      border-color: #686e8c;
    }
  }
`;

export const InputStyledForgot = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-color: rgb(166, 167, 172);
    color: rgb(13, 13, 14);
    height: 46px;
    font-size: 14px;

    & fieldset {
      border-color: rgb(166, 167, 172);
    }

    &:hover fieldset {
      border-color: rgb(166, 167, 172);
    }

    &.Mui-focused fieldset {
      border-color: rgb(166, 167, 172);
      border: 1px solid rgb(166, 167, 172);
    }

    &.Mui-active fieldset {
      border-color: rgb(166, 167, 172);
    }
  }
`;


export const InputStyledPassword = styled(OutlinedInput)`
  border-radius: 50px;
  color: #686e8c;
  background-color: transparent;
  height: 46px;
  font-size: 14px;

  & fieldset {
    border-color: #686e8c;
    border-radius: 50px;
  }

  &:hover fieldset {
    border-color: #686e8c !important;
  }

  &.Mui-focused fieldset,
  &.Mui-active fieldset {
    border-color: #686e8c !important;
    border-width: 2px;
  }

  input {
    color: #686e8c;
  }
  .MuiIconButton-root {
    color: #686e8c;
  }

  &:focus-within .MuiIconButton-root {
    color: #686e8c;
  }
  &:hover-within .MuiIconButton-root {
    color: #686e8c;
  }
`;

const MasterAdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const initialErrorMessage = { username: "", password: "" };

   const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleCloseSave =()=>{
      toast.success("Check your email address; the link will successfully send your account. ")
      setOpen(false);
    }

  const [error, setError] = useState(initialErrorMessage);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  console.log(login);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleAdminLoginUser = () => {
    let a = { username: "", password: "" };
    setError(a);
    if (login.username === "") {
      a.username = "*Please enter the username";
    }
    if (login.username !== "Admin") {
      a.username = "*Invalid username.";
    }
    if (login.password === "") {
      a.password = "*Please enter the password";
    }
    if (login.password !== "Admin@123") {
      a.password = "*Invalid password.";
    } else {
      navigate("/master_admin_dashboard");
      setError(a);
    }
  };

  return (
    <div className={Styles.MasterAdminLoginMainContainer}>
      <div className={Styles.MasterAdminLoginMainCart}>
        <div className={Styles.MasterAdminLoginContentCart}>
          <div className={Styles.MasterAdminLoginContentCartTitleContainer}>
            <p className={Styles.MasterAdminLoginContentCartTitleContainerText}>
              Welcome Back!
            </p>
          </div>
          <div className={Styles.MasterAdminLoginInputContainer}>
            <p className={Styles.MasterAdminLoginInputContainerText}>
              Username
            </p>

            <InputStyled
              id="outlined-basic"
              // className={Styles.MasterAdminLoginInputContainerInput}
              inputProps={{ maxLength: 20 }}
              name="username"
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
            />
            {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )}
          </div>
          <div className={Styles.MasterAdminLoginInputContainer}>
            <p className={Styles.MasterAdminLoginInputContainerText}>
              password
            </p>

            <InputStyledPassword
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              inputProps={{ maxLength: 15 }}
              name="password"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {error?.password && (
              <span className={Styles.registerErrormsg}>{error?.password}</span>
            )}
          </div>
          <div className={Styles.MasterAdminLoginCartPasswordRememberContainer}>
            <div className={Styles.MasterAdminLoginCartPasswordRememberContent}>
              <Checkbox
                className={
                  Styles.MasterAdminLoginCartPasswordRememberContentIcon
                }
              />
              <p className={Styles.MasterAdminLoginInputContainerTextLink}>
                Remember me
              </p>
            </div>
           <p className={Styles.MasterAdminLoginInputContainerTextLink} onClick={()=> handleOpen()}>
              Forgot Password ?
            </p>
          </div>
          <button
            className={Styles.MasterAdminLoginButton}
            onClick={() => handleAdminLoginUser()}
          >
            Login
          </button>
        </div>
        <div className={Styles.MasterAdminLoginContentCartTwo}>
          <img
            src={HeaderImage}
            alt=""
            className={Styles.MasterAdminLoginContentCartTitleImg}
          />
           <p className={Styles.MasterAdminLoginTitleText}>
               Super Admin Login
              </p>
        </div>
      </div>
        <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box class="modal">
                <div className={Styles.MasterAdminLoginModelModelPopupContainer}>
                  <div className="ModelPopupHeader">
                    <p className="ModelPopupHeaderText">Forgot Password</p>
                    <CloseOutlinedIcon
                      onClick={() => handleClose()}
                      className="ModelPopupHeaderIcon"
                    />
                  </div>
                  <div className="ModelPopupbody">
                    <div className={Styles.MasterAdminLoginModelTitleContainer}>
                      <p className={Styles.MasterAdminLoginModelTitle}>Enter Your Email-ID we will share the change password Link</p>
                    </div>
                    <div className={Styles.MasterAdminLoginModelInputContainer}>
                      <div className={Styles.MasterAdminLoginModelInputContent}>
                        <div className={Styles.MasterAdminLoginModelInputCart}>
                          <p className={Styles.MasterAdminLoginModelInputCartText}>
                          Enter your Email-ID
                          </p>
      
                          <InputStyledForgot
                            id="outlined-basic"
                            className={Styles.LoginPageInputContainerInput}
                            inputProps={{ maxLength: 50 }}
                            name="username"
                            // onChange={(e) => setProducerUser({ ...producerUser, username: e.target.value })}
                          />
                          
                        </div>
                      
                      </div>
      
                    
                    </div>
                  </div>
                  <div className="ModelPopupfooter">
                    <button
                      className={Styles.MasterAdminLoginModelCancelButton}
                      onClick={() => handleClose()}
                    >
                      Cancel
                    </button>
                    <button
                      className={Styles.MasterAdminLoginModelSubmitButton}
                      onClick={() => handleCloseSave()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
    </div>
  );
};
export default MasterAdminLogin;
