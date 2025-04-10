import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import HeaderPage from "../../header/Header";
import AdminIcon from "../../../../assets/images/AdminIcon.png";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByUserId } from "../../../../redux/Action";


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
  height: "60vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  overflowY: "scroll",
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


const MasterAdminDetails = () => {
  const theme = useTheme();
    let dispatch = useDispatch();
  const { userid } = useParams();

    const userById = useSelector((state) => state.users.getByUserIdSuccessfull);

  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   useEffect(() => {
      dispatch(getByUserId(userid));
    }, [userid]);

  const [role, setRole] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className={Styles.MasterAdminDetailsMainContainer}>
      <HeaderPage />
      <div className={Styles.MasterAdminDetails}>
        <div className={Styles.MasterAdminDetailsCantainer}>
          <div className={Styles.MasterAdminDetailsImageAndTextContent}>
            <img className={Styles.MasterAdminDetailsImg} src={AdminIcon} alt="AdminIcon" />
            <p className={Styles.MasterAdminDetailsText}>Admin User</p>
          </div>
          <Link to="/admin" className="Link">
            <Tooltip title="Back to List" arrow>
            <span className='InvestorDetailsNavConatinerIcon'>&#8629;</span>
            </Tooltip>
        </Link>
        </div>
        <div className={Styles.MasterAdminDetailsNavContainer}>
          <p className={Styles.MasterAdminDetailsNavContainerText}>
          {userById?.firstname}{userById?.lastname}
          </p>
          <button
            className={Styles.MasterAdminDetailsNavContainerButton}
            onClick={() => handleOpen()}
          >
            Add User
          </button>
        </div>
        

        <div className={Styles.MasterAdminDetailsTabAndNotesContainer}>
          <div className={Styles.MasterAdminDetailsPageTabsContainer}>
            <Box >
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
                <div className={Styles.MasterAdminDetailsTabDetailsContainer}>
                  <div className={Styles.MasterAdminDetailsTabDetailsHeader}>
                    <p
                      className={Styles.MasterAdminDetailsTabDetailsHeaderText}
                    >
                      Login Info
                    </p>
                    <EditOutlinedIcon
                      className={
                        Styles.MasterAdminDetailsTabDetailsHeaderEditIcon
                      }
                      onClick={()=> handleOpenEdit()}
                    />
                  </div>
                  <div
                    className={Styles.MasterAdminDetailsInformationContianer}
                  >
                    <div
                      className={Styles.MasterAdminDetailsInformationContent}
                    >
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          Username
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                          {userById?.username}
                        </p>
                      </div>
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          password
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                          {userById?.password}
                        </p>
                      </div>
                    </div>
                    <div className={Styles.MasterAdminDetailsTabDetailsHeader}>
                      <p
                        className={
                          Styles.MasterAdminDetailsTabDetailsHeaderTextLoginInfo
                        }
                      >
                        User Info
                      </p>
                    </div>
                    <div
                      className={Styles.MasterAdminDetailsInformationContent}
                    >
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          Producer Name
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                           {userById?.firstname}{userById?.lastname}
                        </p>
                      </div>
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          Email
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                          {userById?.username}
                        </p>
                      </div>
                    </div>
                    <div
                      className={Styles.MasterAdminDetailsInformationContent}
                    >
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          Phone
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                           {userById?.phone}
                        </p>
                      </div>
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          Legal Entity
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                           {userById?.legalentity}
                        </p>
                      </div>
                    </div>
                    <div
                      className={Styles.MasterAdminDetailsInformationContent}
                    >
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          Street Address
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                             {userById?.street}
                        </p>
                      </div>
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          City
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                            {userById?.city}
                        </p>
                      </div>
                    </div>
                    <div
                      className={Styles.MasterAdminDetailsInformationContent}
                    >
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          State
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                             {userById?.state}
                        </p>
                      </div>
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          Zip Code
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                         {userById?.zipcode}
                        </p>
                      </div>
                    </div>
                    <div
                      className={Styles.MasterAdminDetailsInformationContent}
                    >
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          Role
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                               {userById?.role}
                        </p>
                      </div>
                      <div
                        className={
                          Styles.MasterAdminDetailsInformationDetailsCard
                        }
                      >
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardText
                          }
                        >
                          Status
                        </p>
                        <p
                          className={
                            Styles.MasterAdminDetailsInformationDetailsCardTextdata
                          }
                        >
                         {userById?.status}
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
               <Box className="modal">
                <div className={Styles.CreateInvestorMainContainer}>
                     <div className="ModelPopupHeader sam">
                                              <p className="ModelPopupHeaderText">
                                              Add User
                                              </p>
                                              <CloseOutlinedIcon
                                                onClick={() => handleClose()}
                                                className="ModelPopupHeaderIcon"
                                              />
                                            </div>
                  <div className="ModelPopupbody">
                  <div className="PageHeader" style={{marginTop:"10px"}}>
                    <p className="PageTableTitleText">Login Info</p>
                  </div>
      
                  <div className="InputContainer">
                    <div className="InputContent">
                      <div className="InputCart">
                        <p className="InputCartText">
                          User Name
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="firstname"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">
                          Password
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="lastname"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="PageHeader" style={{marginTop:"30px"}}>
                    <p className="PageTableTitleText">User Info</p>
                  </div>
                  <div className="InputContent">
                    <div className="InputCart">
                    <p className="InputCartText">First Name</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="emailid"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">Last Name</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="mobilenumber"
                          
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    <div className="InputCart">
                    <p className="InputCartText">Email</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="emailid"
                          
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">Phone</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="mobilenumber"
                          
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    <div className="InputCart">
                    <p className="InputCartText">
                          Lagal Entity
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="addtess"
                          
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">Street</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="city"
                          
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    <div className="InputCart">
                    <p className="InputCartText">City</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="state"
                          
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">State</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="zipcode"
                          
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    
                      <div className="InputCart">
                        <p className="InputCartText">
                          Zip
                        </p>
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="date_added"
                         
                        />
                        
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                    <p className="InputCartText">
                         Status
                        </p>
      
                       <SelectStyled
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        onChange={handleChangeRole}
                      >
                        <MenuItem value={10}>-None-</MenuItem>
                        <MenuItem value={20}>Active</MenuItem> 
                        <MenuItem value={30}>Deactive</MenuItem>                   
                      </SelectStyled>
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    
                      <div className="InputCart">
                        <p className="InputCartText">
                          Role
                        </p>
      
                        <SelectStyled
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        onChange={handleChangeRole}
                      >
                        <MenuItem value={10}>-None-</MenuItem>
                        <MenuItem value={20}>Master Admin</MenuItem>
                        <MenuItem value={30}>Admin</MenuItem>                       
                      </SelectStyled>
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    
                  </div>
                  </div>
                  <div className="ModelPopupfooter sam">
                    <button
                      className="CancelButton"
                      onClick={() => handleClose()}
                    >
                      Cancel
                    </button>
                    <button
                      className="SubmitButton"
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
                <div className={Styles.CreateInvestorMainContainer}>
                     <div className="ModelPopupHeader sam">
                                              <p className="ModelPopupHeaderText">
                                              Edit User
                                              </p>
                                              <CloseOutlinedIcon
                                                onClick={() => handleCloseEdit()}
                                                className="ModelPopupHeaderIcon"
                                              />
                                            </div>
                  <div className="ModelPopupbody">
                  <div className="PageHeader" style={{marginTop:"10px"}}>
                    <p className="PageTableTitleText">Login Info</p>
                  </div>
      
                  <div className="InputContainer">
                    <div className="InputContent">
                      <div className="InputCart">
                        <p className="InputCartText">
                          User Name
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.username}
                          name="username"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">
                          Password
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.password}
                          name="password"
                        
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="PageHeader" style={{marginTop:"30px"}}>
                    <p className="PageTableTitleText">User Info</p>
                  </div>
                  <div className="InputContent">
                    <div className="InputCart">
                    <p className="InputCartText">First Name</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.firstname}
                          name="firstname"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">Last Name</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.lastname}
                          name="lastname"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    <div className="InputCart">
                    <p className="InputCartText">Email</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.email}
                          name="email"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">Phone</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.phone}
                          name="phone"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    <div className="InputCart">
                    <p className="InputCartText">
                          Lagal Entity
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.legalentity}
                          name="legalentity"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">Street</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.street}
                          name="street"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    <div className="InputCart">
                    <p className="InputCartText">City</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.city}
                          name="city"
                         
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                        <p className="InputCartText">State</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue=  {userById?.state}
                          name="state"
                        
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    
                      <div className="InputCart">
                        <p className="InputCartText">
                          Zip
                        </p>
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          defaultValue=  {userById?.zipcode}
                          name="zipcode"
                         
                        />
                        
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className="InputCart">
                    <p className="InputCartText">
                         Status
                        </p>
      
                       <SelectStyled
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=  {userById?.status}
                      >
                        <MenuItem value={10}>-None-</MenuItem>
                        <MenuItem value="active">Active</MenuItem> 
                        <MenuItem value="unactive">Deactive</MenuItem>                   
                      </SelectStyled>
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    
                      <div className="InputCart">
                        <p className="InputCartText">
                          Role
                        </p>
      
                        <SelectStyled
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                       defaultValue=  {userById?.role}
                      >
                        <MenuItem value={10}>-None-</MenuItem>
                        <MenuItem value="masteradmin">Master Admin</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>                       
                      </SelectStyled>
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    
                  </div>
                  </div>
                  <div className="ModelPopupfooter sam">
                    <button
                      className="CancelButton"
                      onClick={() => handleCloseEdit()}
                    >
                      Cancel
                    </button>
                    <button
                      className="SubmitButton"
                      onClick={() => handleClose()}
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
export default MasterAdminDetails;
