import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import SuperAdminHeaderPage from "../../superAdminHeader/Index";
import InvestorsImage from "../../../../../assets/images/InvestorImageAdmin.png";
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
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInvestorById, getProjectsByID } from "../../../../../redux/Action";
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
const AdminInvestorsDetails= () => {

      let dispatch = useDispatch();
    const theme = useTheme();
    const { investorid } = useParams();

      const investorById = useSelector(
          (state) => state.investors.getInvestorsByIdDetails
        );

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

 useEffect(() => {
  dispatch(getInvestorById(investorid));
}, [investorid]);

    const [createAdminInvestorDetails, setcreateAdminInvestorDetails] = useState({
                  firstname: "",
                  lastname: "",
                  emailid: "",
                  addtess: "",
                  mobilenumber: "",
                  city: "",
                  state: "",
                  zipcode: "",
                  county: "",
                  accredited: "",
                  date_added: "",
                  general_comments: "",
                  CoProducers_probability: "",
                  CoProducers_projects: "",
                  projectname: "",
                  status: "",
                  final_amount: "",
                  invesment_method: "",
                });
              
                console.log(createAdminInvestorDetails, "createAdminInvestorDetails");
              
                const addNewcreateAdminInvestorDetails = () => {
                  handleClose();
                };

  return (
    <div className={Styles.AdminInvestorDetailsMainContainer}>
      <SuperAdminHeaderPage />
      <div className={Styles.AdminInvestorDetails}>
        <div className={Styles.AdminInvestorDetailsPageNav}>
          <p className={Styles.AdminInvestorDetailsPageNavText}>
          <img className={Styles.AdminInvestorDetailsPageNavImg} src={InvestorsImage} alt="AdmininvestorImageAdminView" />
          Investors
          </p>
           <Link to="/admin_investor" className="Link">
                                        <Tooltip title="Back to List" arrow>
                                            {/* <KeyboardReturnIcon className={Styles.InvestorDetailsNavConatinerIcon} /> */}
                                            <span className='InvestorDetailsNavConatinerIcon'>&#8629;</span>
                                        </Tooltip>
                                    </Link>
        </div>
        <div className={Styles.AdminInvestorPageTitleCart}>
          <p className={Styles.AdminInvestorPageTitleCartText}><span>Producer - </span> {investorById.data?.firstname} {investorById.data?.lastname}</p>
         
        </div>

        <div className={Styles.AdminInvestorDetailsTabAndNotesContainer}>
          <div className={Styles.AdminInvestorDetailsPageTabsContainer}>
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
                <div className={Styles.AdminInvestorDetailsTabDetailsContainer}>
                  <div className={Styles.AdminInvestorDetailsTabDetailsHeader}>
                    <p className={Styles.AdminInvestorDetailsTabDetailsHeaderText}>
                    Investor Details
                    </p>
                    <EditOutlinedIcon
                      className={Styles.AdminInvestorDetailsTabDetailsHeaderEditIcon}
                      onClick={()=> handleOpenEdit()}
                    />
                  </div>
                  <div className={Styles.AdminInvestorDetailsInformationContianer}>
                    <div className={Styles.AdminInvestorDetailsInformationContent}>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          Investor Name
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                          {investorById.data?.firstname} {investorById.data?.lastname}
                        </p>
                      </div>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          Email
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                          {investorById.data?.emailid} 
                        </p>
                      </div>
                    </div>
                    
                    <div className={Styles.AdminInvestorDetailsInformationContent}>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          Phone
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                            {investorById.data?.mobilenumber} 
                        </p>
                      </div>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          Street Address
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                         {investorById.data?.address} 
                        </p>
                      </div>
                    </div>
                    <div className={Styles.AdminInvestorDetailsInformationContent}>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          City
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                           {investorById.data?.city} 
                        </p>
                      </div>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          State
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                           {investorById.data?.state} 
                        </p>
                      </div>
                    </div>
                    <div className={Styles.AdminInvestorDetailsInformationContent}>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          Zip Code
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                           {investorById.data?.zipcode} 
                        </p>
                      </div>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          Accredited
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                          {investorById.data?.accredited} 
                        </p>
                      </div>
                    </div>
                    <div className={Styles.AdminInvestorDetailsInformationContent}>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          Refferral Source
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                             {investorById.data?.referralsource} 
                        </p>
                      </div>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          Date Added
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                                 {investorById.data?.dateadded} 
                        </p>
                      </div>
                    </div>
                    <div className={Styles.AdminInvestorDetailsInformationContent}>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          Investor Probability
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                            {investorById.data?.investorprobability} 
                        </p>
                      </div>
                    </div>
                    <div className={Styles.AdminInvestorDetailsInformationContent}>
                      <div
                        className={Styles.AdminInvestorDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardText
                          }
                        >
                          General Comments
                        </p>
                        <p
                          className={
                            Styles.AdminInvestorDetailsInformationDetailsCardTextdata
                          }
                        >
                         {investorById.data?.generalcomments} 
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
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div className={Styles.AdminInvestorDetailsModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">
                Edit Investor
              </p>
              <CloseOutlinedIcon
                onClick={() => handleCloseEdit()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
            <div className="PageHeader">
              <p className="PageTableTitleText">Invester Details</p>
            </div>

            <div className="InputContainer">
              <div className="InputContent">
                <div className="InputCart">
                  <p className="InputCartText">
                    First Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    defaultValue={investorById.data?.firstname}
                    name="firstname"
                   
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className="InputCart">
                  <p className="InputCartText">
                    Last Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    defaultValue={investorById.data?.lastname}
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
                    inputProps={{ maxLength: 20 }}
                    defaultValue={investorById.data?.emailid}
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
                    defaultValue={investorById.data?.mobilenumber}
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
                    Street Address
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    defaultValue={investorById.data?.address}
                    name="address"
                   
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className="InputCart">
                  <p className="InputCartText">City</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    defaultValue={investorById.data?.city}
                    name="city"
                   
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className="InputContent">
              <div className="InputCart">
              <p className="InputCartText">State</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    defaultValue={investorById.data?.state}
                    name="state"
                   
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className="InputCart">
                  <p className="InputCartText">Zip Code</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    defaultValue={investorById.data?.zipcode}
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
                    Accredited?
                  </p>

                  <div className="checkInput">
                    <label>
                      <input
                        type="checkbox"
                        name="accredited"
                        value="yes"
                        checked={createAdminInvestorDetails.accredited === "yes"}
                       
                      />
                      Yes
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        name="accredited"
                        value="no"
                        checked={createAdminInvestorDetails.accredited === "no"}
                        
                      />
                      No
                    </label>
                  </div>
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className="InputCart">
                  <p className="InputCartText">
                    Refferral Source
                  </p>

                  <select  class="SearchSelectFilterInput"
                     defaultValue={investorById.data?.referralsource}
                     onChange={handleChangeRole}
                      >
                      <option value="None">None</option>
                      <option value="Co-Producer">Co-Producer</option>
                    </select>
                  
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className="InputContent">
              <div className="InputCart">
              <p className="InputCartText">
                    Date Added
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    defaultValue={investorById.data?.dateadded}
                    name="dateadded"
                    type="date"
                    
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className="InputCart">
                  <p className="InputCartText">
                    Investor Probability
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    defaultValue={investorById.data?.investorprobability}
                    name="investorprobability"
                   
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className="InputCart">             
              <p className="InputCartText">
                  General Comments
                </p>
                <InputStyled
                  id="outlined-basic"
                  className={Styles.LoginPageInputContainerInput}
                  inputProps={{ maxLength: 200 }}
                  defaultValue={investorById.data?.generalcomments}
                  name="generalcomments"
                  multiline
                  rows={4}
                  
                />
                {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
              </div>
            </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={Styles.AdminInvestorDetailsCancelButton}
                onClick={() => handleCloseEdit()}
              >
                Cancel
              </button>
              <button
                className={Styles.AdminInvestorDetailsSubmitButton}
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
export default AdminInvestorsDetails;
