import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import SuperAdminHeaderPage from "../superAdminHeader/Index";
import SubscriptionIcon from "../../../../assets/images/SubscriptionIcon.png";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useRef } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addSubscription, deleteSubscriptiondata, editSubscriptiondata, getAllSubscription, getBySubscriptionId } from "../../../../redux/Action";
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   height: "60vh",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "10px",
//   overflowY: "scroll",
// };

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
export const SelectStyledFilter = styled(Select)`
      & .MuiOutlinedInput-root {
        font-size: 14px;
        color: rgb(13, 13, 14);
        border-radius: 8px;
        transition: border-color 0.2s ease-in-out;
        display: flex;
        align-items: center; / Center text vertically /
        height: 36px; / Reduce height to match image /
    
        & fieldset {
          border-color: rgb(166, 167, 172);
        }
    
        &:hover fieldset {
          border-color: rgb(166, 167, 172);
        }
    
        &.Mui-disabled fieldset {
          border-color: rgb(166, 167, 172);
        }
    
        & .MuiOutlinedInput-input {
          padding: 4px 10px !important; / Reduce internal padding /
          height: auto;
          display: flex;
          align-items: center;
        }
    
        & .MuiSelect-icon {
          right: 8px; / Adjust dropdown icon positioning /
        }
    
        / Fix padding issue /
        & .MuiSelect-select {
          padding: 4px 10px !important; / Override padding /
          display: flex;
          align-items: center;
        }
      }
    `;

const Subscriptions = () => {
  let dispatch = useDispatch();

  const subscriptionList = useSelector(
    (state) => state.subscription.getAllSubscriptionSuccessfull
  );

  const subscriptionCreate = useSelector(
    (state) => state.subscription.addSubscriptionSuccessfull
  );

  const subscriptionbyId = useSelector(
    (state) => state.subscription.getBySubscriptionIdSuccessfull
  );

 const editSubscription = useSelector(
    (state) => state.subscription.editSubscriptionSuccessfull
  ); 

  const deleteSubscription = useSelector(
    (state) => state.subscription.deleteSubscriptionIdSuccessfull
  );


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [updateID, setUpdateID]=useState()

  const handleOpenEdit = (id) =>{
    setUpdateID(id)
    dispatch(getBySubscriptionId(id));
    if (subscriptionbyId !== "" || subscriptionbyId !== undefined || subscriptionbyId !== null){
     setOpenEdit(true);
    }
    }

  const handleCloseEdit = () => setOpenEdit(false);



  const [role, setRole] = useState(10);

  // get all subscriptions
  useEffect(() => {
    dispatch(getAllSubscription());
  }, []);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const [selectedStatus, setSelectedStatus] = useState("Status"); // For status filter
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [allData, setAllData] = useState([]);

  const [createsubscription, setCreateSubscription]=useState(
    {      
      producersid: 1,
        producersname: "",
        subscriptionplan: "",
        fromdate: "",
        todate: "",
        paymentmethod:"",
        status:"",
        amountpaid: "",
        dateofamountpaid:"",
    }
  )

  const [updateSubscription, setUpdateSubscription]=useState(
    {      
      producersid: 1,
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
      dispatch(getAllSubscription());
      toast.success("subscription Added successfully")
    }, 300);
    }else{
      toast.error("Something Error While Creating Subscription")
    }
  }

  const handleCloseUpdateSubscription = () => {
    dispatch(editSubscriptiondata({id : updateID , data :updateSubscription }));
    setOpenEdit(false);
    if (editSubscription !== "" || editSubscription !== undefined || editSubscription !== null){
      setTimeout(() => {
      dispatch(getAllSubscription());
      toast.success("subscription updated successfully")
    }, 300);
    }else{
      toast.error("Something Error While update the Subscription")
    }
    
  }

  const handleDeleteSubscription=(id)=>{
    dispatch(deleteSubscriptiondata(id));
    if (deleteSubscription !== "" || deleteSubscription !== undefined || deleteSubscription !== null){
      setTimeout(() => {
      dispatch(getAllSubscription());
      toast.success("subscription delete successfully")
    }, 300);
    }else{
      toast.error("Something Error While deleting Subscription")
    }
  }

 
  const tableHead = {
    no: "No.",
    name: "Name",
    subscriptionPlan: "Subscription Plan",
    from: "From",
    to: "To",
    paymentMethod: "Payment Method",
    status: "Status",
    action: "Actions",
  };
  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  useEffect(() => {
    if (subscriptionList) {
      const mappedData = subscriptionList.map((item, index) => ({
        no: index + 1,
        name: item.producersname,
        subscriptionPlan: item.subscriptionplan,
        from: item.fromdate,
        to: item.todate,
        paymentMethod: item.paymentmethod,
        status: item.status,
        action: (
          <div className="TableActionContainer">
            <EditOutlinedIcon
              className="TableActionEditIcon"
              onClick={() => handleOpenEdit(item.subscriptionid)}
            />
            <Link to={`/subscription_details/${item.subscriptionid}`} className="Link">
              <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" />
            </Link>
            <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" 
            onClick={()=> handleDeleteSubscription(item.subscriptionid)}/>
          </div>
        ),
      }));

      setAllData(mappedData);
      setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
    }
  }, [subscriptionList]);

  const searchData = useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        allData
          .filter((item) => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <th key={index}>{title}</th>
    ));
  };

  return (
    <div className={Styles.SubscriptionsMainContainer}>
      <SuperAdminHeaderPage />
      <div className={Styles.Subscriptions}>
        <div className={Styles.SubscriptionsNav}>
          <p className={Styles.SubscriptionsNavText}>
            <img
              src={SubscriptionIcon}
              alt="SubscriptionIcon"
              className={Styles.SubscriptionIconImage}
            />
            Subscriptions
          </p>
          <div className={Styles.SubscriptionsNavButtonContainer}>
            <button className={Styles.SubscriptionsNavExportButton}>
              Export
            </button>
            <button
              className={Styles.SubscriptionsNavAddSubscriptionsButton}
              onClick={() => handleOpen()}
            >
              Add Subscriptions
            </button>
          </div>
        </div>

        <div className={Styles.SubscriptionsTabsContainerTable}>
          <div className="TableFilter">
            <div class="Search">
              <input
                style={{ minWidth: "100% !important" }}
                placeholder="Search the list..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="search"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <FormControl sx={{ minWidth: 200 }} className="TableStatus">
              <SelectStyledFilter
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <MenuItem value="Status">Show</MenuItem>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Newest First">Newest First</MenuItem>
              </SelectStyledFilter>
            </FormControl>
          </div>
          <table>
            <thead>
              <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover">{tableData()}</tbody>
          </table>
          <div className={Styles.SubscriptionsTablePagination}>
            <Pagination
              pageSize={countPerPage}
              onChange={updatePage}
              current={currentPage}
              total={allData.length}
            />
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
          <div className={Styles.SubscriptionsModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">Add Subscription</p>
              <CloseOutlinedIcon
                onClick={() => handleClose()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
              <div className={Styles.SubscriptionsTitleContainer}>
                <p className={Styles.SubscriptionsTitle}>Subscription Info</p>
              </div>
              <div className={Styles.SubscriptionsInputContainer}>
                <div className={Styles.SubscriptionsInputContent}>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Producer
                    </p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={createsubscription.producersname}
                      onChange={(e)=> setCreateSubscription({...createsubscription, producersname:e.target.value })}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value="Stew">Stew</MenuItem>
                      <MenuItem value="Robbin">Robbin</MenuItem>
                    </SelectStyled>
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Subscription Plan
                    </p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={createsubscription.subscriptionplan}
                      onChange={(e)=> setCreateSubscription({...createsubscription, subscriptionplan:e.target.value })}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value="Trial">Trial</MenuItem>
                      <MenuItem value="primimum">Primium</MenuItem>
                    </SelectStyled>
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                </div>
                <div className={Styles.SubscriptionsInputContent}>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>From</p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }} // Increased max length for multiline
                      name="firstname"
                      onChange={(e)=> setCreateSubscription({...createsubscription, fromdate:e.target.value })}


                      // onChange={(e) =>
                      //   setCreateInvestor({
                      //     ...createInvestor,
                      //     firstname: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>To</p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      value={createsubscription.todate}
                      name="firstname"
                      onChange={(e)=> setCreateSubscription({...createsubscription, todate:e.target.value })}

                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.SubscriptionsInputContent}>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Payment Method
                    </p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={createsubscription.paymentmethod}
                      onChange={(e)=> setCreateSubscription({...createsubscription, paymentmethod:e.target.value })}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Direct Payment">Direct Payment</MenuItem>
                    </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>Status</p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={createsubscription.status}
                      onChange={(e)=> setCreateSubscription({...createsubscription, status:e.target.value })}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value="Acitve">Acitve</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.SubscriptionsInputContent}>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Amount Paid
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      value={createsubscription.amountpaid}
                      onChange={(e)=> setCreateSubscription({...createsubscription, amountpaid:e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Date of Amount Paid
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      value={createsubscription.dateofamountpaid}
                      onChange={(e)=> setCreateSubscription({...createsubscription, dateofamountpaid:e.target.value })}
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
                className={Styles.SubscriptionsCancelButton}
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className={Styles.SubscriptionsSubmitButton}
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
          <div className={Styles.SubscriptionsModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">Edit Subscription</p>
              <CloseOutlinedIcon
                onClick={() => handleCloseEdit()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
              <div className={Styles.SubscriptionsTitleContainer}>
                <p className={Styles.SubscriptionsTitle}>Subscription Info</p>
              </div>
              <div className={Styles.SubscriptionsInputContainer}>
                <div className={Styles.SubscriptionsInputContent}>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Producer
                    </p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={subscriptionbyId.producersname}
                      onChange={(e)=> setUpdateSubscription({...updateSubscription, producersname:e.target.value})}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value="Stew">Stew</MenuItem>
                      <MenuItem value="Robbin">Robbin</MenuItem>
                    </SelectStyled>
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Subscription Plan
                    </p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={subscriptionbyId.subscriptionplan}
                      onChange={(e)=> setUpdateSubscription({...updateSubscription, subscriptionplan:e.target.value})}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value="Trial">Trial</MenuItem>
                      <MenuItem value="Primium">Primium</MenuItem>
                    </SelectStyled>
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                </div>
                <div className={Styles.SubscriptionsInputContent}>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>From</p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }} // Increased max length for multiline
                      name="firstname"
                      defaultValue={subscriptionbyId.fromdate}
                      onChange={(e)=> setUpdateSubscription({...updateSubscription, fromdate:e.target.value})}



                      // onChange={(e) =>
                      //   setCreateInvestor({
                      //     ...createInvestor,
                      //     firstname: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>To</p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="firstname"
                      defaultValue={subscriptionbyId.todate}
                      onChange={(e)=> setUpdateSubscription({...updateSubscription, todate:e.target.value})}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.SubscriptionsInputContent}>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Payment Method
                    </p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={subscriptionbyId.paymentmethod}
                      onChange={(e)=> setUpdateSubscription({...updateSubscription, paymentmethod:e.target.value})}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Direct Payment">Direct Payment</MenuItem>
                    </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>Status</p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={subscriptionbyId.status}
                      onChange={(e)=> setUpdateSubscription({...updateSubscription, status:e.target.value})}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value="Acitve">Acitve</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.SubscriptionsInputContent}>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Amount Paid
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="firstname"
                      defaultValue={subscriptionbyId.amountpaid}
                      onChange={(e)=> setUpdateSubscription({...updateSubscription, amountpaid:e.target.value})}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.SubscriptionsInputCart}>
                    <p className={Styles.SubscriptionsInputCartText}>
                      Date of Amount Paid
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      defaultValue={subscriptionbyId.dateofamountpaid}
                      onChange={(e)=> setUpdateSubscription({...updateSubscription, dateofamountpaid:e.target.value})}

                      name="dateofamountpaid"
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
                className={Styles.SubscriptionsCancelButton}
                onClick={() => handleCloseEdit()}
              >
                Cancel
              </button>
              <button
                className={Styles.SubscriptionsSubmitButton}
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
export default Subscriptions;
