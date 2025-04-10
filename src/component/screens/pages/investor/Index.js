import React, { useEffect, useState, useRef } from "react";
import HeaderPage from "../header/Header";
import Styles from "./Index.module.css";
import InvestorsImage from "../../../assets/images/InvestorsImage.png";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import {
  addInvestors,
  editInvestors,
  getAllInvestors,
  getInvestorById,
  getInvestorbyProducerId,
} from "../../../redux/Action";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
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
const InvestorPage = () => {
  let dispatch = useDispatch();

  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const investorList = useSelector(
    (state) => state.investors.getInvestorsProducersIdSuccessfull
  );
  const investorById = useSelector(
    (state) => state.investors.getInvestorsByIdDetails
  );

  const addinvestorsRespnse = useSelector(
    (state) => state.investors.getAddInvestorsDetails
  );

  const editinvestorsRespnse = useSelector(
    (state) => state.investors.getEditInvestorsDetails
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [updateID, setUpdateID] = useState();
  const handleOpenEdit = (investorid) => {
    dispatch(getInvestorById(investorid));
    setUpdateID(investorid);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const [role, setRole] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const [selectedStatus, setSelectedStatus] = useState("Status"); // For status filter

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [createInvestor, setCreateInvestor] = useState({
    producersid: storedUser.userid,
    firstname: "",
    lastname: "",
    emailid: "",
    address: "",
    mobilenumber: "",
    city: "",
    state: "",
    zipcode: "",
    referralsource: "",
    accredited: "",
    dateadded: "",
    generalcomments: "",
    investorprobability: "",

  });

  const [updateInvestor, setUpdateInvestor] = useState({
    producersid: storedUser.userid,
    firstname: "",
    lastname: "",
    emailid: "",
    address: "",
    mobilenumber: "",
    city: "",
    state: "",
    zipcode: "",
    referralsource: "",
    accredited: "",
    dateadded: "",
    generalcomments: "",
    investorprobability: "",
  });
  console.log(createInvestor, "createInvestor");

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

  // const tableHead = [
  //   "No.",
  //   "Name",
  //   "Email",
  //   "Phone",
  //   "State",
  //   "City",
  //   "ZipCode",
  //   "Status",
  //   "Actions",
  // ];

  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  useEffect(() => {
    dispatch(getInvestorbyProducerId(storedUser.userid));
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
            <Link to={`/investors_details/${item.investorid}`} className="Link">
              <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" />
            </Link>
            <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" />
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

  // add investor

  const addNewInvestor = async () => {
    const newInvestorData = {
      ...createInvestor,
      projects: [
        {
          projectname: createInvestor.projectname,
          CoProducers_projects: createInvestor.CoProducers_projects,
          CoProducers_probability: createInvestor.CoProducers_probability,
          status: createInvestor.status,
          final_amount: createInvestor.final_amount,
          invesment_method: createInvestor.invesment_method,
        },
      ],
    };

    try {
      const response = await dispatch(addInvestors(newInvestorData)).unwrap(); // Unwrap to get the actual response
      if (response && response.data) {
        const addedInvestor = response.data;

        const newEntry = {
          S_no: allData.length + 1,
          investor_Name: `${addedInvestor.firstname} ${addedInvestor.lastname}`,
          email: addedInvestor.emailid,
          phone: addedInvestor.mobilenumber,
          state: addedInvestor.state,
          accredited: addedInvestor.city,
          date: addedInvestor.zipcode,
          action: (
            <div className="TableActionContainer">
              <EditOutlinedIcon
                className="TableActionEditIcon"
                onClick={() => handleOpenEdit(addedInvestor.investorid)}
              />
              <Link
                to={`/investors_details/${addedInvestor.investorid}`}
                className="Link"
              >
                <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" />
              </Link>
              <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" />
            </div>
          ),
        };

        setAllData((prevData) => [newEntry, ...prevData]);
        setCollection((prevCollection) =>
          cloneDeep([newEntry, ...prevCollection.slice(0, countPerPage - 1)])
        );
      }
    } catch (error) {
      console.error("Error adding investor:", error);
    }

    handleClose();
  };

  useEffect(() => {
    if (
      addinvestorsRespnse !== "" ||
      addinvestorsRespnse !== null ||
      addinvestorsRespnse !== undefined
    ) {
      dispatch(getInvestorbyProducerId(storedUser.userid));
    }
    if (
      editinvestorsRespnse !== "" ||
      editinvestorsRespnse !== null ||
      editinvestorsRespnse !== undefined
    ) {
      dispatch(getInvestorbyProducerId(storedUser.userid));
    }
  }, [addinvestorsRespnse, editinvestorsRespnse]);
  //update investor

  const editinvestor = () => {
    const updatedInvestor = {
      producersid: updateInvestor.producersid || investorById.data?.producersid,
      firstname: updateInvestor.firstname || investorById.data?.firstname,
      lastname: updateInvestor.lastname || investorById.data?.lastname,
      emailid: updateInvestor.emailid || investorById.data?.emailid,
      mobilenumber:
        updateInvestor.mobilenumber || investorById.data?.mobilenumber,
      address: updateInvestor.address || investorById.data?.address,
      city: updateInvestor.city || investorById.data?.city,
      county: updateInvestor.county || investorById.data?.county,
      state: updateInvestor.state || investorById.data?.state,
      zipcode: updateInvestor.zipcode || investorById.data?.zipcode,
      accredited: updateInvestor.accredited || investorById.data?.accredited,
      referralsource:
        updateInvestor.referralsource || investorById.data?.referralsource,
      dateadded: updateInvestor.dateadded || investorById.data?.dateadded,
      investorprobability:
        updateInvestor.investorprobability ||
        investorById.data?.investorprobability,
      generalcomments:
        updateInvestor.generalcomments || investorById.data?.generalcomments,
      CoProducersprobability:
        updateInvestor.CoProducersprobability ||
        investorById.data?.CoProducersprobability,
      CoProducersprojects:
        updateInvestor.CoProducersprojects ||
        investorById.data?.CoProducersprojects,
      projectname: updateInvestor.projectname || investorById.data?.projectname,
      status: updateInvestor.status || investorById.data?.status,
      finalamount: updateInvestor.finalamount || investorById.data?.finalamount,
      invesmentmethod:
        updateInvestor.invesmentmethod || investorById.data?.invesmentmethod,
    };

    dispatch(editInvestors({ id: updateID, data: updatedInvestor }));
    handleCloseEdit();
  };

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


  const handleExportCSV = () => {
    if (!investorList?.data || investorList.data.length === 0) {
      toast.error("No investor data available to export.");
      return;
    }
  
    const allInvestors = investorList.data;
  
    // Dynamically collect all unique keys from all investor objects
    const headersSet = new Set();
    allInvestors.forEach(investor => {
      Object.keys(investor).forEach(key => headersSet.add(key));
    });
  
    const headers = Array.from(headersSet);
  
    const csvRows = [
      headers.join(","), // CSV header row
      ...allInvestors.map(investor =>
        headers.map(header =>
          `"${(investor[header] ?? "").toString().replace(/"/g, '""')}"`
        ).join(",")
      )
    ];
  
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `investors_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  

  return (
    <div className={Styles.InvestorPageMainContainer}>
      <HeaderPage />
      <div className={Styles.InvestorPageMainContent}>
        <div className={Styles.InvestorPageMainNavContainer}>
          <div className={Styles.InvestorPagenavCart}>
            <img
              src={InvestorsImage}
              alt=""
              className={Styles.InvestorPagenavCartImg}
            />
            <p className={Styles.InvestorPagenavCartText}>Investor</p>
          </div>
          <div className={Styles.CreateInvestorButtonContent}>
          <button
          className={Styles.CreateInvestorButtonContentExportButton}
          onClick={handleExportCSV}
        >
          Export
        </button> 

            <button
              className={Styles.ViewInvestorPageNavContainerButton}
              onClick={handleOpen}
            >
              Add Investor
            </button>
          </div>
        </div>

        <div className={Styles.InvestorPageTabsContainerTable}>
          <div className="TableFilter">
            <div className="Search">
              <input
                placeholder="Search Campaign"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            {/* <FormControl sx={{ minWidth: 200 }} className="TableStatus">
              <SelectStyledFilter
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <MenuItem value="Status">Investing In Deals</MenuItem>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active Raising">Active Raising</MenuItem>
              </SelectStyledFilter>
            </FormControl> */}

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
          <div className={Styles.InvestorPageTablePagination}>
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
          <div className={Styles.CreateInvestorMainContainer}>
            <div className="ModelPopupHeader sam">
              <p className="ModelPopupHeaderText">New Investor</p>
              <CloseOutlinedIcon
                onClick={() => handleClose()}
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
                      inputProps={{ maxLength: 50 }}
                      name="firstname"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          firstname: e.target.value,
                        })
                      }
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
                      name="lastname"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          lastname: e.target.value,
                        })
                      }
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
                      name="emailid"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          emailid: e.target.value,
                        })
                      }
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
                      name="mobilenumber"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          mobilenumber: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      name="addtess"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          address: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      name="city"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          city: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      name="state"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          state: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      name="zipcode"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          zipcode: e.target.value,
                        })
                      }
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
                          checked={createInvestor.accredited === "yes"}
                          onChange={(e) =>
                            setCreateInvestor({
                              ...createInvestor,
                              accredited: e.target.checked ? "yes" : "",
                            })
                          }
                        />
                        Yes
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          name="accredited"
                          value="no"
                          checked={createInvestor.accredited === "no"}
                          onChange={(e) =>
                            setCreateInvestor({
                              ...createInvestor,
                              accredited: e.target.checked ? "no" : "",
                            })
                          }
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

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={createInvestor.referralsource}
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          referralsource: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="None">-None-</MenuItem>
                      <MenuItem value="Co-Producer">Co-Producer</MenuItem>
                    </SelectStyled>
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
                      inputProps={{ maxLength: 50 }}
                      name="dateadded"
                      type="date"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          dateadded: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      name="investorprobability"
                      onChange={(e) =>
                        setCreateInvestor({
                          ...createInvestor,
                          investorprobability: e.target.value,
                        })
                      }
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                </div>
                <div className={Styles.CreateInvestorInputCartSingleInput}>
                  <p className="InputCartText">General Comments</p>
                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 5000 }}
                    name="username"
                    multiline
                    rows={4}
                    onChange={(e) =>
                      setCreateInvestor({
                        ...createInvestor,
                        generalcomments: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
            </div>
            <div className="ModelPopupfooter sam">
              <button
                className={Styles.CreateInvestorCancelButton}
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className={Styles.CreateInvestorSubmitButton}
                onClick={() => addNewInvestor()}
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
                      inputProps={{ maxLength: 50 }}
                      name="firstname"
                      defaultValue={investorById.data?.firstname}
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          firstname: e.target.value,
                        })
                      }
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
                      defaultValue={investorById.data?.lastname}
                      name="lastname"
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          lastname: e.target.value,
                        })
                      }
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
                      defaultValue={investorById.data?.emailid}
                      name="emailid"
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          emailid: e.target.value,
                        })
                      }
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
                      defaultValue={investorById.data?.mobilenumber}
                      name="mobilenumber"
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          mobilenumber: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      defaultValue={investorById.data?.address}
                      name="address"
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          address: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      defaultValue={investorById.data?.city}
                      name="city"
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          city: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      defaultValue={investorById.data?.state}
                      name="state"
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          state: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      defaultValue={investorById.data?.zipcode}
                      name="zipcode"
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          zipcode: e.target.value,
                        })
                      }
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
                          checked={createInvestor.accredited === "yes"}
                          onChange={(e) =>
                            setUpdateInvestor({
                              ...updateInvestor,
                              accredited: e.target.value,
                            })
                          }
                        />
                        Yes
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          name="accredited"
                          value="no"
                          checked={createInvestor.accredited === "no"}
                          onChange={(e) =>
                            setUpdateInvestor({
                              ...updateInvestor,
                              accredited: e.target.value,
                            })
                          }
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

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={investorById.data?.referralsource}
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          referralsource: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="none">-None-</MenuItem>
                      <MenuItem value="Google">Co-Producer</MenuItem>
                    </SelectStyled>
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
                      inputProps={{ maxLength: 50 }}
                      defaultValue={investorById.data?.dateadded}
                      name="date_added"
                      type="date"
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          dateadded: e.target.value,
                        })
                      }
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
                      inputProps={{ maxLength: 50 }}
                      defaultValue={investorById.data?.investorprobability}
                      name="investorprobability"
                      onChange={(e) =>
                        setUpdateInvestor({
                          ...updateInvestor,
                          investorprobability: e.target.value,
                        })
                      }
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                </div>
                <div className={Styles.CreateInvestorInputCartSingleInput}>
                  <p className="InputCartText">General Comments</p>
                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50000 }}
                    defaultValue={investorById.data?.generalcomments}
                    name="generalcomments"
                    multiline
                    rows={4}
                    onChange={(e) =>
                      setUpdateInvestor({
                        ...updateInvestor,
                        generalcomments: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
            </div>
            <div className="ModelPopupfooter sam">
              <button
                className={Styles.CreateInvestorCancelButton}
                onClick={() => handleCloseEdit()}
              >
                Cancel
              </button>
              <button
                className={Styles.CreateInvestorSubmitButton}
                onClick={() => editinvestor()}
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
export default InvestorPage;
