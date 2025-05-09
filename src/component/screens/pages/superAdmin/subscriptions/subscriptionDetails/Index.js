import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import SuperAdminHeaderPage from "../../superAdminHeader/Index";
import SubscriptionIcon from "../../../../../assets/images/SubscriptionIcon.png";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Input, TextField } from "@mui/material";
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
import { addSubscription, editSubscriptiondata, getAllSubscription, getAllUsers, getBySubscriptionId, getByUserId } from "../../../../../redux/Action";
import { toast } from "react-toastify";


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


const SubscriptionDetails = () => {
    let dispatch = useDispatch();
  const theme = useTheme();
  const { subscriptionid } = useParams();

   const subscriptionbyId = useSelector(
      (state) => state.subscription.getBySubscriptionIdSuccessfull
    );

     const subscriptionCreate = useSelector(
        (state) => state.subscription.addSubscriptionSuccessfull
      );

       const editSubscription = useSelector(
          (state) => state.subscription.editSubscriptionSuccessfull
        ); 
      
  const subscriptionList = useSelector(
    (state) => state.subscription.getAllSubscriptionSuccessfull
  );

      const userById = useSelector((state) => state.users.getByUserIdSuccessfull);
  
    const userList = useSelector((state) => state.users.getAllUsersSuccessfull);


  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   useEffect(() => {
     dispatch(getAllSubscription());
      dispatch(getAllUsers());
    dispatch(getBySubscriptionId(subscriptionid));
  }, [subscriptionid]);


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
      if (subscriptionList && subscriptionList.length > 0) {
        const producersIds = subscriptionList.map((item) => item.producersid);
        dispatch(getByUserId(producersIds));
      }
    }, [subscriptionList]);
    

    const [createsubscription, setCreateSubscription]=useState(
      {      
        producersid: "",
          producersname:"",
          subscriptionplan: "",
          fromdate: '',
          todate:"",
          paymentmethod: "",
          status:"",
          amountpaid: "",
          dateofamountpaid: "",
      }
    )

      const [updateSubscription, setUpdateSubscription]=useState(
        {      
          producersid: subscriptionbyId.producersid,
          producersname: subscriptionbyId.producersname,
          subscriptionplan: subscriptionbyId.subscriptionplan,
          fromdate: subscriptionbyId.fromdate,
          todate: subscriptionbyId.todate,
          paymentmethod: subscriptionbyId.paymentmethod,
          status:subscriptionbyId.status,
          amountpaid: subscriptionbyId.amountpaid,
          dateofamountpaid: subscriptionbyId.dateofamountpaid,
        }
      )


const handleCreateSubscription=()=>{
    dispatch(addSubscription(createsubscription));
    setOpen(false);
    if (subscriptionCreate !== "" || subscriptionCreate !== undefined || subscriptionCreate !== null){
      setTimeout(() => {
      // dispatch(getAllSubscription());
      toast.success("subscription Added successfully")
    }, 300);
    }else{
      toast.error("Something Error While Creating Subscription")
    }
  }

  const handleCloseUpdateSubscription = () => {
    dispatch(editSubscriptiondata({id : subscriptionid , data :updateSubscription }));
    setOpenEdit(false);
    if (editSubscription !== "" || editSubscription !== undefined || editSubscription !== null){
      setTimeout(() => {
        dispatch(getBySubscriptionId(subscriptionid));
      toast.success("subscription updated successfully")
    }, 300);
    }else{
      toast.error("Something Error While update the Subscription")
    }
    
  }

  return (
    <div className={Styles.SubscriptionDetailsMainContainer}>
      <SuperAdminHeaderPage />
      <div className={Styles.SubscriptionDetails}>
        <div className={Styles.SubscriptionDetailsPageNav}>
          <p className={Styles.SubscriptionDetailsPageNavText}>
            <img className={Styles.SubscriptionDetailsPageNavImg} src={SubscriptionIcon} alt="SubscriptionIcon" />
            Subscription
          </p>
          <Link to="/subscription" className="Link">
                    <Tooltip title="Back to List" arrow>
                        {/* <KeyboardReturnIcon className={Styles.InvestorDetailsNavConatinerIcon} /> */}
                        <span className='InvestorDetailsNavConatinerIcon'>&#8629;</span>
                    </Tooltip>
                </Link>
        </div>
       
        <div className={Styles.SubscriptionDetailsTitleCart}>
          <p className={Styles.SubscriptionDetailsTitleCartText}>{subscriptionbyId.producersname}</p>
          <button
            className={Styles.SubscriptionDetailsTitleCartButton}
            onClick={() => handleOpen()}
          >
            Add Subscription
          </button>
        </div>

        <div className={Styles.SubscriptionDetailsTabAndNotesContainer}>
          <div className={Styles.SubscriptionDetailsPageTabsContainer}>
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
                <div className={Styles.SubscriptionDetailsTabDetailsContainer}>
                  <div className={Styles.SubscriptionDetailsTabDetailsHeader}>
                    <p className={Styles.SubscriptionDetailsTabDetailsHeaderText}>
                      Subscription Info
                    </p>
                    <EditOutlinedIcon
                      className={Styles.SubscriptionDetailsTabDetailsHeaderEditIcon}
                      onClick={()=> handleOpenEdit()}
                    />
                  </div>
                  <div className={Styles.SubscriptionDetailsInformationContianer}>
                    <div className={Styles.SubscriptionDetailsInformationContent}>
                      <div
                        className={Styles.SubscriptionDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardText
                          }
                        >
                          Name
                        </p>
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardTextdata
                          }
                        >
                        {userById.firstname} {userById.lastname}
                        </p>
                      </div>
                      <div
                        className={Styles.SubscriptionDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardText
                          }
                        >
                          Subscription Plan
                        </p>
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardTextdata
                          }
                        >
                         {subscriptionbyId.subscriptionplan}
                        </p>
                      </div>
                    </div>
                    <div className={Styles.SubscriptionDetailsInformationContent}>
                      <div
                        className={Styles.SubscriptionDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardText
                          }
                        >From
                        </p>
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardTextdata
                          }
                        >
                          {subscriptionbyId.fromdate}
                        </p>
                      </div>
                      <div
                        className={Styles.SubscriptionDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardText
                          }
                        >
                          To
                        </p>
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardTextdata
                          }
                        >
                           {subscriptionbyId.todate}
                        </p>
                      </div>
                    </div>
                    <div className={Styles.SubscriptionDetailsInformationContent}>
                      <div
                        className={Styles.SubscriptionDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardText
                          }
                        >
                          Payment Method
                        </p>
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardTextdata
                          }
                        >
                            {subscriptionbyId.paymentmethod}
                        </p>
                      </div>
                      <div
                        className={Styles.SubscriptionDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardText
                          }
                        >
                          Status
                        </p>
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardTextdata
                          }
                        >
                           {subscriptionbyId.status}
                        </p>
                      </div>
                    </div>
                    <div className={Styles.SubscriptionDetailsInformationContent}>
                      <div
                        className={Styles.SubscriptionDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardText
                          }
                        >
                          Amount Paid
                        </p>
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardTextdata
                          }
                        >
                          {subscriptionbyId.amountpaid}
                        </p>
                      </div>
                      <div
                        className={Styles.SubscriptionDetailsInformationDetailsCard}
                      >
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardText
                          }
                        >
                          Date Of Amount Paid
                        </p>
                        <p
                          className={
                            Styles.SubscriptionDetailsInformationDetailsCardTextdata
                          }
                        >
                          {subscriptionbyId.dateofamountpaid}
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
          <div className={Styles.SubscriptionDetailsModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">
                Add Subscription
              </p>
              <CloseOutlinedIcon
                onClick={() => handleClose()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody ">
            <div className={Styles.SubscriptionDetailsTitleContainer}>
              <p className={Styles.SubscriptionDetailsTitle}>Subscription Info</p>
            </div>
            <div className={Styles.SubscriptionDetailsInputContainer}>
              <div className={Styles.SubscriptionDetailsInputContent}>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Producer</p>

                  
                    <select
                        className="SearchSelectFilter"
                        value={createsubscription.producersname}
                        onChange={(e)=> setCreateSubscription({...createsubscription, producersid:e.target.value })}

                      >
                        <option value="None">None</option>
                        {Array.isArray(userList) && userList.length > 0 ? (
                          userList.map((user) => (
                            <option key={user.userid} value={user.userid}>
                               {user.firstname} {user.lastname}
                            </option>
                          ))
                        ) : (
                          <option disabled>No Producers Available</option>
                        )}
                      </select>
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Subscription Plan</p>
                  <select  class="SearchSelectFilterInput"
                      value={createsubscription.subscriptionplan}
                      onChange={(e)=> setCreateSubscription({...createsubscription, subscriptionplan:e.target.value})}
                      >
                      <option value="None">None</option>
                      <option value="Trial">Trial</option>
                      <option value="Primium">Primium</option>
                    </select>
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className={Styles.SubscriptionDetailsInputContent}>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>From</p>

                  <InputStyled
                    id="outlined-basic"
                    type="date"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }} // Increased max length for multiline
                    name="firstname"
                    value={createsubscription.fromdate}
                    onChange={(e)=> setCreateSubscription({...createsubscription, fromdate:e.target.value})}

                   
                    // onChange={(e) =>
                    //   setCreateInvestor({
                    //     ...createInvestor,
                    //     firstname: e.target.value,
                    //   })
                    // }
                  />
                </div>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>To</p>

                  <InputStyled
                    id="outlined-basic"
                    type="date"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    value={createsubscription.todate}
                    onChange={(e)=> setCreateSubscription({...createsubscription, todate:e.target.value})}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.SubscriptionDetailsInputContent}>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Payment Method</p>

                  
                  <select  class="SearchSelectFilterInput"
                       value={createsubscription.paymentmethod}
                       onChange={(e)=> setCreateSubscription({...createsubscription, paymentmethod:e.target.value})}
                      >
                      <option value="None">None</option>
                      <option value="online">online</option>
                      <option value="Direct Payment">Direct Payment</option>
                    </select>
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Status</p>

                 
                  <select  class="SearchSelectFilterInput"
                          value={createsubscription.status}
                          onChange={(e)=> setCreateSubscription({...createsubscription, status:e.target.value})}
                      >
                      <option value="None">None</option>
                      <option value="Active">Active</option>
                      <option value="InActive">InActive</option>
                    </select>
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.SubscriptionDetailsInputContent}>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>
                    Amount Paid
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    value={createsubscription.amountpaid}
                    onChange={(e)=> setCreateSubscription({...createsubscription, amountpaid:e.target.value})}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Date of Amount Paid</p>

                  <InputStyled
                    id="outlined-basic"
                    type="date"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    value={createsubscription.dateofamountpaid}
                    onChange={(e)=> setCreateSubscription({...createsubscription, dateofamountpaid:e.target.value})}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
            </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={Styles.SubscriptionDetailsCancelButton}
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className={Styles.SubscriptionDetailsSubmitButton}
                onClick={() => handleCreateSubscription()}
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
          <div className={Styles.SubscriptionDetailsModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">
                Edit Subscription
              </p>
              <CloseOutlinedIcon
                onClick={() => handleCloseEdit()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
            <div className={Styles.SubscriptionDetailsTitleContainer}>
              <p className={Styles.SubscriptionDetailsTitle}>Subscription Info</p>
            </div>
            <div className={Styles.SubscriptionDetailsInputContainer}>
              <div className={Styles.SubscriptionDetailsInputContent}>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Producer</p>

                
                   <select
                          className="SearchSelectFilter"
                          value={`${userById?.firstname ?? ''} ${userById?.lastname ?? ''}`}
                          onChange={() => {}}
                        >
                          <option disabled value={`${userById?.firstname ?? ''} ${userById?.lastname ?? ''}`}>
                            {userById ? `${userById.firstname} ${userById.lastname}` : "No Producer Selected"}
                          </option>
                        </select>
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Subscription Plan</p>


                  <select  class="SearchSelectFilterInput"
                        value={subscriptionbyId.subscriptionplan}
                        onChange={(e)=> setUpdateSubscription({...updateSubscription, subscriptionplan: e.target.value})}
                      >
                      <option value="None">None</option>
                      <option value="Trial">Trial</option>
                      <option value="Primium">Primium</option>
                    </select>
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className={Styles.SubscriptionDetailsInputContent}>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>From</p>

                  <InputStyled
                    id="outlined-basic"
                    type="date"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }} // Increased max length for multiline
                    name="firstname"
                    value={subscriptionbyId.fromdate}
                    onChange={(e)=> setUpdateSubscription({...updateSubscription, fromdate: e.target.value})}

                  />
                </div>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>To</p>

                  <InputStyled
                    id="outlined-basic"
                    type="date"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    value={subscriptionbyId.todate}
                    onChange={(e)=> setUpdateSubscription({...updateSubscription, todate: e.target.value})}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.SubscriptionDetailsInputContent}>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Payment Method</p>

                  <select  class="SearchSelectFilterInput"
                        value={subscriptionbyId.paymentmethod}
                        onChange={(e)=> setUpdateSubscription({...updateSubscription, paymentmethod: e.target.value})}
                      >
                      <option value="None">None</option>
                      <option value="Online">Online</option>
                      <option value="Direct Payment">Direct Payment</option>
                    </select>
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Status</p>

                 
                  <select  class="SearchSelectFilterInput"
                    value={subscriptionbyId.status}
                    onChange={(e)=> setUpdateSubscription({...updateSubscription, status: e.target.value})}
                      >
                      <option value="None">None</option>
                      <option value="Acitve">Acitve</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
              <div className={Styles.SubscriptionDetailsInputContent}>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>
                    Amount Paid
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    value={subscriptionbyId.amountpaid}

                    onChange={(e)=> setUpdateSubscription({...updateSubscription, amountpaid: e.target.value})}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
                <div className={Styles.SubscriptionDetailsInputCart}>
                  <p className={Styles.SubscriptionDetailsInputCartText}>Date of Amount Paid</p>

                  <InputStyled
                    id="outlined-basic"
                     type="date"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    value={subscriptionbyId.dateofamountpaid}

                    onChange={(e)=> setUpdateSubscription({...updateSubscription, dateofamountpaid: e.target.value})}
                  />
                  {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                </div>
              </div>
            </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={Styles.SubscriptionDetailsCancelButton}
                onClick={() => handleCloseEdit()}
              >
                Cancel
              </button>
              <button
                className={Styles.SubscriptionDetailsSubmitButton}
                onClick={() => handleCloseUpdateSubscription()}
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
export default SubscriptionDetails;
