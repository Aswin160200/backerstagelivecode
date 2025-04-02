import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import SuperAdminHeaderPage from "../../superAdminHeader/Index";
import ProducersImageAdminView from "../../../../../assets/images/ProducersImageAdminView.png";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import UndoIcon from '@mui/icons-material/Undo';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editExitUsers, getAllUsers, getByUserId } from "../../../../../redux/Action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};

export const InputStyled = styled(TextField)`
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

export const SelectStyled = styled(Select)`
  & .MuiOutlinedInput-root {
    height: 44px;
    font-size: 14px;
    color: rgb(13, 13, 14);
    border-radius: 6px;
    transition: border-color 0.2s ease-in-out;

    & fieldset {
      border-color: rgb(166, 167, 172);
    }

    &:hover fieldset {
      border-color: rgb(166, 167, 172);
    }

    &.Mui-disabled fieldset {
      border-color: rgb(166, 167, 172);
    }
  }
`;
const ProducerDetails = () => {
  let dispatch = useDispatch();
  const theme = useTheme();
  const { userid } = useParams();

    const userById = useSelector((state) => state.users.getByUserIdSuccessfull);
  

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
     dispatch(getByUserId(userid));
    }, []);


        // const handleUpdateProducer =()=>{
        //   dispatch(editExitUsers({ updateId, updateProducerUser }))
        //       setOpenEdit(false);
        //       if (editUsersSuccessfull !== "" || editUsersSuccessfull !== undefined || editUsersSuccessfull !== null){
        //         setTimeout(() => {
        //         dispatch(getAllUsers());
        //         toast.success("Producer updated successfully")
        //       }, 300);
        //       }else{
        //         toast.error("Something Error While update the Producer")
        //       }
        // }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [role, setRole] = useState(10);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className={Styles.ProducerDetailsMainContainer}>
      <SuperAdminHeaderPage />
      <div className={Styles.ProducerDetails}>
        <div className={Styles.ProducerDetailsPageNav}>
          <p className={Styles.ProducerDetailsPageNavText}>
            <img className={Styles.ProducerDetailsPageNavImg} src={ProducersImageAdminView} alt="ProducersImageAdminView" />
            Producers
          </p>
           <Link to="/producers" className="Link">
                              <Tooltip title="Back to List" arrow>
                                  <KeyboardReturnIcon className={Styles.InvestorDetailsNavConatinerIcon} />
                              </Tooltip>
                          </Link>
        </div>
        <div className={Styles.ProducerDetailsTitleCart}>
          <p className={Styles.ProducerDetailsTitleCartText}>{userById.firstname}{userById.lastname}</p>
          <button
            className={Styles.ProducerDetailsTitleCartButton}
            onClick={() => handleOpen()}
          >
            Add Producer
          </button>
        </div>

        <div className={Styles.ProducerDetailsTabAndNotesContainer}>
          <div className={Styles.ProducerDetailsPageTabsContainer}>
            <Box sx={{ bgcolor: "background.paper" }}>
              <AppBar
                position="static"
                sx={{ bgcolor: "#fff", borderRadius: "10px", boxShadow: "none !important" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                  TabIndicatorProps={{
                    sx: {
                      backgroundColor: "#2f8cff",
                      height: "2px",
                      borderRadius: "2px",
                    },
                  }}
                >
                  <Tab
                    label={<p className={Styles.TabAddIconTExt}>Details</p>}
                    {...a11yProps(0)}
                    sx={{ maxWidth: "15% !important" }}
                  />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0} dir={theme.direction}>
                <div className={Styles.ProducerDetailsTabDetailsContainer}>
                  <div className={Styles.ProducerDetailsTabDetailsHeader}>
                    <p className={Styles.ProducerDetailsTabDetailsHeaderText}>
                      Login Info
                    </p>
                    <EditOutlinedIcon
                      className={Styles.ProducerDetailsTabDetailsHeaderEditIcon}
                      onClick={()=> handleOpenEdit()}
                    />
                  </div>
                  <div className={Styles.ProducerDetailsInformationContianer}>
                    <div className={Styles.ProducerDetailsInformationContent}>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          Username
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                         {userById.username}
                        </p>
                      </div>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          password
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                           {userById.password}
                        </p>
                      </div>
                    </div>
                    <div className={Styles.ProducerDetailsTabDetailsHeader}>
                      <p
                        className={
                          Styles.ProducerDetailsTabDetailsHeaderTextLoginInfo
                        }
                      >
                        Producer Info
                      </p>
                    </div>
                    <div className={Styles.ProducerDetailsInformationContent}>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          Producer Name
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                         {userById.firstname}  {userById.lastname}
                        </p>
                      </div>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          Email
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                          {userById.username} 
                        </p>
                      </div>
                    </div>
                    <div className={Styles.ProducerDetailsInformationContent}>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          Phone
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                          {userById.phone} 
                        </p>
                      </div>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          Legal Entity
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                           {userById.legalentity} 
                        </p>
                      </div>
                    </div>
                    <div className={Styles.ProducerDetailsInformationContent}>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          Street Address
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                             {userById.street} 
                        </p>
                      </div>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          City
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                             {userById.city} 
                        </p>
                      </div>
                    </div>
                    <div className={Styles.ProducerDetailsInformationContent}>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          State
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                           {userById.state} 
                        </p>
                      </div>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          Zip Code
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                             {userById.zipcode} 
                        </p>
                      </div>
                    </div>
                    <div className={Styles.ProducerDetailsInformationContent}>
                      <div
                        className={Styles.ProducerDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardText
                          }
                        >
                          Status
                        </p>
                        <p
                          className={
                            Styles.ProducerDetailsInformationDetailsCardTextdata
                          }
                        >
                             {userById.status} 
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
       <Box class="modal">
          <div className={Styles.ProducerDetailsModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">
                Add Producers
              </p>
              <CloseOutlinedIcon
                onClick={() => handleClose()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
            <div className={Styles.ProducerDetailsTitleContainer}>
              <p className={Styles.ProducerDetailsTitle}>Login Info</p>
            </div>
            <div className={Styles.ProducerDetailsInputContainer}>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Username
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Password
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="lastname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>

              <div className={Styles.ProducerDetailsTitleContainer}>
                <p className={Styles.ProducerDetailsTitle}>Producer Info</p>
              </div>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Fist Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Last Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>Email</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>Phone</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="lastname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Legal Entity
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>Street</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>

              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>City</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>State</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Zip Code
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>Status</p>
                  <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={handleChangeRole}
                  >
                    <MenuItem value={10}>-None-</MenuItem>
                    <MenuItem value={20}>Acitve</MenuItem>
                    <MenuItem value={30}>Inactive</MenuItem>
                  </SelectStyled>
                </div>
              </div>
            </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={Styles.ProducerDetailsCancelButton}
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className={Styles.ProducerDetailsSubmitButton}
                onClick={() => handleClose()}
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div className={Styles.ProducerDetailsModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">
                Edit Producers
              </p>
              <CloseOutlinedIcon
                onClick={() => handleCloseEdit()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
            <div className={Styles.ProducerDetailsTitleContainer}>
              <p className={Styles.ProducerDetailsTitle}>Login Info</p>
            </div>
            <div className={Styles.ProducerDetailsInputContainer}>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Username (Email_ID)
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    defaultValue={userById.username} 
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Password
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="lastname"
                    defaultValue={userById.password} 

                    // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>

              <div className={Styles.ProducerDetailsTitleContainer}>
                <p className={Styles.ProducerDetailsTitle}>Producer Info</p>
              </div>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Fist Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    defaultValue={userById.firstname} 

                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Last Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength:50 }}
                    name="firstname"
                    defaultValue={userById.lastname} 

                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>Email</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    defaultValue={userById.email} 
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>Phone</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="lastname"
                    defaultValue={userById.phone} 

                    // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Legal Entity
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    defaultValue={userById.legalentity} 

                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>Street</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    defaultValue={userById.street} 

                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>

              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>City</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    defaultValue={userById.city} 
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>State</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    defaultValue={userById.state} 
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.ProducerDetailsInputContent}>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>
                    Zip Code
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    defaultValue={userById.zipcode} 
                    // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.ProducerDetailsInputCart}>
                  <p className={Styles.ProducerDetailsInputCartText}>Status</p>
                  <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={userById.status} 
                    onChange={handleChangeRole}
                  >
                    <MenuItem value={10}>-None-</MenuItem>
                    <MenuItem value={20}>Acitve</MenuItem>
                    <MenuItem value={30}>Inactive</MenuItem>
                  </SelectStyled>
                </div>
              </div>
            </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={Styles.ProducerDetailsCancelButton}
                onClick={() => handleCloseEdit()}
              >
                Cancel
              </button>
              <button
                className={Styles.ProducerDetailsSubmitButton}
                onClick={() => handleCloseEdit()}
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
export default ProducerDetails;
