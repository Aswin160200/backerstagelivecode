import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import SuperAdminHeaderPage from "../superAdminHeader/Index";
import InvestorsImage from "../../../../assets/images/InvestorImageAdmin.png";
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
import { getAllInvestors, getAllUsers, getInvestorById } from "../../../../redux/Action";

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

const AdminInvestor = () => {
  let dispatch = useDispatch();
  const investorList = useSelector(
    (state) => state.investors.getAllInvestorSuccessfull
  );

    const investorById = useSelector(
      (state) => state.investors.getInvestorsByIdDetails
    );

    const userList = useSelector((state) => state.users.getAllUsersSuccessfull);
  

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = (investorid) => {
     dispatch(getInvestorById(investorid));
    setOpenEdit(true);

  }
  const handleCloseEdit = () =>{ 

    setOpenEdit(false);
    window.location.reload()
  }

  const [filterProducerInvestors, setFilterProducerInvestors]= useState();

  const handleChangeFilterProducerbyInvestors = (investorId) => {
    // dispatch(getInvestorById(investorId));
    alert(investorId);
  };
  const [role, setRole] = useState(10);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const [selectedStatus, setSelectedStatus] = useState("Status"); // For status filter
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [createAdminInvestor, setcreateAdminInvestor] = useState({
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

  console.log(createAdminInvestor, "createAdminInvestor");

  const addNewcreateAdminInvestor = () => {
    handleClose();
  };

  const [allData, setAllData] = useState([]);

  
  const tableHead = {
    S_no: "S.no",
    investor_Name: "Investor Name",
    email: "Email",
    phone: "Phone",
    state: "State",
    accredited: "Accredited",
    date: "Date",
    action: "Actions",
  };

  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  useEffect(() => {
    dispatch(getAllInvestors());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (investorList?.data) {
      const mappedData = investorList?.data.map((item, index) => ({
        S_no: index + 1,
        investor_Name: `${item.firstname} ${item.lastname}`,
        email: item.emailid,
        phone: item.mobilenumber,
        state: item.state,
        accredited: item.city,
        date: item.zipcode,
        action: (
          <div className="TableActionContainer">
            <EditOutlinedIcon
              className="TableActionEditIcon"
              onClick={() => handleOpenEdit(item.investorid)}
            />
            <Link to={`/admin_investors_details/${item.investorid}`} className="Link">
              <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" />
            </Link>
          </div>
        ),
      }));
      setAllData(mappedData);
      setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
    }
  }, [investorList]);
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
    <div className={Styles.AdminInvestorMainContainer}>
      <SuperAdminHeaderPage />
      <div className={Styles.AdminInvestorPage}>
        <div className={Styles.AdminInvestorPageNav}>
          <p className={Styles.AdminInvestorPageNavText}>
            <img
              className={Styles.AdminInvestorPageNavImg}
              src={InvestorsImage}
              alt="AdmininvestorImageAdminView"
            />
            Investors
          </p>
          <div className={Styles.AdminInvestorPageNavButtonContainer}>
            <button className={Styles.AdminInvestorPageNavExportButton}>
              Export
            </button>
          </div>
        </div>
        <div className={Styles.AdminInvestorPageTitleCart}>
          <p className={Styles.AdminInvestorPageTitleCartText}>
            <span className={Styles.AdminInvestorPageTitleCartText}>Producer</span>
            <select  
              className="SearchSelectFilterInput"
              defaultValue={investorById.data?.referralsource}
              onChange={(e) => handleChangeFilterProducerbyInvestors(e.target.value)} 
            >
              <option value="Show">none</option>
              {Array.isArray(userList) && userList.length > 0 ? (
                userList.map((investor) => (
                  <option key={investor.investorid} value={investor.investorid}>
                    {investor.firstname} {investor.lastname}
                  </option>
                ))
              ) : (
                <option disabled>No Producers Available</option>
              )}
            </select>

          </p>
        </div>

        <div className={Styles.AdminInvestorPageTabsContainerTable}>
          <div className="TableFilter">
            <div class="Search">
              <input
                style={{ minWidth: "100% !important" }}
                placeholder="Search the investors..."
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
             
                <select  class="SearchSelectFilterInput"
                     defaultValue={investorById.data?.referralsource}
                     onChange={handleChangeRole} 
                      >
                      <option value="Show">Show</option>
                      <option value="All">All</option>
                      <option value="Newest First">Newest First</option>
                    </select>
            </FormControl>
          </div>
          <table>
            <thead>
              <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover">{tableData()}</tbody>
          </table>
          <div className={Styles.AdminInvestorPageTablePagination}>
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
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box class="modal">
          <div className={Styles.AdminInvestorPageModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">Edit Investor</p>
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
                    <p className="InputCartText">First Name</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      defaultValue={investorById.data?.firstname}
                      inputProps={{ maxLength: 20 }}
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
                    <p className="InputCartText">Street Address</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      defaultValue={investorById.data?.address}
                      name="addtess"
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
                    <p className="InputCartText">Accredited?</p>

                    <div className="checkInput">
                      <label>
                        <input
                          type="checkbox"
                          name="accredited"
                          value="yes"
                          checked={createAdminInvestor.accredited === "yes"}
                        />
                        Yes
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          name="accredited"
                          value="no"
                          checked={createAdminInvestor.accredited === "no"}
                        />
                        No
                      </label>
                    </div>
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Refferral Source</p>

                    
                    <select  class="SearchSelectFilterInput"
                     defaultValue={investorById.data?.referralsource}
                     onChange={handleChangeRole}
                      >
                      <option value="Show">Show</option>
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
                    <p className="InputCartText">Date Added</p>

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
                    <p className="InputCartText">Investor Probability</p>

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
                  <p className="InputCartText">General Comments</p>
                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 200 }}
                    name="generalcomments"
                    defaultValue={investorById.data?.generalcomments}
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
                className={Styles.AdminInvestorPageCancelButton}
                onClick={() => handleCloseEdit()}
              >
                Cancel
              </button>
              <button
                className={Styles.AdminInvestorPageSubmitButton}
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
export default AdminInvestor;
