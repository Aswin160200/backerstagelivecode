import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { getAllUsers, getLogin } from "../../../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box } from "@mui/material";

export const InputStyled = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 50px;
    border-color: #fff;
    color: #fff;
    height: 46px;
    font-size: 14px;

    & fieldset {
      border-color: #fff;
    }

    &:hover fieldset {
      border-color: #fff;
    }

    &.Mui-focused fieldset {
      border-color: #fff;
      border: 1px solid #fff;
    }

    &.Mui-active fieldset {
      border-color: #fff;
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
  color: #fff;
  background-color: transparent;
  height: 46px;
  font-size: 14px;

  & fieldset {
    border-color: #fff;
    border-radius: 50px;
  }

  &:hover fieldset {
    border-color: #fff !important;
  }

  &.Mui-focused fieldset,
  &.Mui-active fieldset {
    border-color: #fff !important;
    border-width: 2px;
  }

  input {
    color: #fff;
  }
  .MuiIconButton-root {
    color: #fff;
  }

  &:focus-within .MuiIconButton-root {
    color: #fff;
  }
  &:hover-within .MuiIconButton-root {
    color: #fff;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const loginResponse = useSelector((state) => state.login.loginSuccessfull);

  const getallusersData = useSelector((state) => state.users.getAllUsersSuccessfull);

  
  const [showPassword, setShowPassword] = useState(false);
  const initialErrorMessage = { username: "", password: "" };
  const [error, setError] = useState(initialErrorMessage);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log(getallusersData)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseSave = () => {
    toast.success(
      "Check your email address; the link will successfully send your account. "
    );
    setOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginUser = () => {
    let errors = { username: "", password: "" };
    setError(errors);

    if (login.username === "") {
      errors.username = "*Please enter the username";
    }
    if (login.password === "") {
      errors.password = "*Please enter the password";
    }

    if (errors.username || errors.password) {
      setError(errors);
      return;
    }

    console.log(login)
    console.log(getallusersData)

    const foundUser = getallusersData && getallusersData?.find(
      (user) =>
        user.username === login.username && user.password === login.password
     
    );
    console.log(foundUser)
    if (!foundUser) {
      toast.error("Invalid username or password");
      return;
    }

    sessionStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    dispatch(getLogin(login));
  };

 
  useEffect(() => {
    if (loginResponse.success === true) {
      navigate("/homePage");
      toast.success(loginResponse.message);
    } else {
      toast.error(loginResponse.message);
    }
  }, [loginResponse]);

  return (
    <div className={Styles.LoginPageMainContainer}>
      <div className={Styles.LoginPageMainCart}>
        <div className={Styles.LoginContentCart}>
          <div className={Styles.LoginContentCartTitleContainer}>
            <p className={Styles.LoginContentCartTitleContainerText}>
              Welcome Back to
            </p>
            <p className={Styles.LoginContentCartTitleContainerText}>
              Producer Login!
            </p>
          </div>
          <div className={Styles.LoginPageInputContainer}>
            <p className={Styles.LoginPageInputContainerText}>Username</p>

            <InputStyled
              id="outlined-basic"
              // className={Styles.LoginPageInputContainerInput}
              inputProps={{ maxLength: 50 }}
              name="username"
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
            />
            {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )}
          </div>
          <div className={Styles.LoginPageInputContainer}>
            <p className={Styles.LoginPageInputContainerText}>password</p>

            <InputStyledPassword
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              inputProps={{ maxLength: 25 }}
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
          <div className={Styles.LoginPageCartPasswordRememberContainer}>
            <div className={Styles.LoginPageCartPasswordRememberContent}>
              <Checkbox
                className={Styles.LoginPageCartPasswordRememberContentIcon}
              />
              <p className={Styles.LoginPageInputContainerText}>Remember me</p>
            </div>
            <p
              className={Styles.LoginPageInputContainerText}
              onClick={() => handleOpen()}
            >
              Forgot Password ?
            </p>
          </div>
          <button
            className={Styles.LoginButton}
            onClick={() => handleLoginUser()}
          >
            Login
          </button>
        </div>
        <div className={Styles.LoginContentCartTwo}>
          <img
            src={HeaderImage}
            alt=""
            className={Styles.LoginContentCartTitleImg}
          />
          <img
            src={LoginImageTwo}
            alt=""
            className={Styles.LoginContentCartImg}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box class="modal">
          <div className={Styles.LoginModelModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">Forgot Password</p>
              <CloseOutlinedIcon
                onClick={() => handleClose()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
              <div className={Styles.LoginModelTitleContainer}>
                <p className={Styles.LoginModelTitle}>
                  Enter Your Email-ID we will share the change password Link
                </p>
              </div>
              <div className={Styles.LoginModelInputContainer}>
                <div className={Styles.LoginModelInputContent}>
                  <div className={Styles.LoginModelInputCart}>
                    <p className={Styles.LoginModelInputCartText}>
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
                className={Styles.LoginModelCancelButton}
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className={Styles.LoginModelSubmitButton}
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
export default LoginPage;
