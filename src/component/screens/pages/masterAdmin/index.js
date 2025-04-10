import React, { useState } from "react";
import Styles from "./Index.module.css";
import HeaderPage from "../header/Header";
import AdminIcon from "../../../assets/images/AdminIcon.png";
import { useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useRef } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getByUserId } from "../../../redux/Action";

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

const MasterAdmin = () => {
  let dispatch = useDispatch();

  const userList = useSelector((state) => state.users.getAllUsersSuccessfull);
  const userById = useSelector(
    (state) => state.users.getByUserIdSuccessfull
  );

  const [selectedStatus, setSelectedStatus] = useState("Status"); // For status filter

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [createMsterAdmin, setCreateMsterAdmin] = useState({
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

  console.log(createMsterAdmin, "createMsterAdmin");

  const addNewMsterAdmin = () => {
    handleClose();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);
 
  const handleOpenEdit = (id) => {
    dispatch(getByUserId(id));
    setOpenEdit(true);

  };
  const handleCloseEdit = () => setOpenEdit(false);
  const [role, setRole] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const [allData, setAllData] = useState([]);

  const tableHead = {
    S_no: "No",
    name: "Name",
    email: "Email",
    phone: "Phone",
    role: "Role",
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
    if (userList) {
      const mappedData = userList.map((item, index) => ({
        S_no: index + 1,
        name: `${item.firstname} ${item.lastname}`,
        email: item.username,
        phone: item.phone,
        role: item.role,
        status: item.status,
        action: (
          <div className="TableActionContainer">
            <EditOutlinedIcon
              className="TableActionEditIcon"
              onClick={() => handleOpenEdit(item.userid)}
            />
            <Link to={`/admin_details/${item.userid}`} className="Link">
              <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" />
            </Link>
            <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" />
          </div>
        ),
      }));
      setAllData(mappedData);
      setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
    }
  }, [userList]);
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

  const exportUserListToCSV = () => {
    if (!userList || userList.length === 0) {
      alert("No user data available to export.");
      return;
    }
  
    const rawData = userList;
    const header = Object.keys(rawData[0]).filter(
      (key) => typeof rawData[0][key] !== "object"
    );
  
    const replacer = (key, value) => (value === null || value === undefined ? "" : value);
    const csv = [
      header.join(","),
      ...rawData.map((row) =>
        header.map((field) => JSON.stringify(row[field], replacer)).join(",")
      ),
    ].join("\r\n");
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "All_Admin_Users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div className={Styles.MasterAdminMainContainer}>
      <HeaderPage />
      <div className={Styles.MasterAdmin}>
        <div className={Styles.MasterAdminNavCantainer}>
          <div className={Styles.MasterAdminNavImageAndTextContent}>
            <img
              className={Styles.MasterAdminNavImg}
              src={AdminIcon}
              alt="AdminIcon"
            />
            <p className={Styles.MasterAdminNavText}>Admin User</p>
          </div>
          <div className={Styles.MasterAdminNavButtonContent}>
          <button
              className={Styles.MasterAdminNavexportButton}
              onClick={exportUserListToCSV}
            >
              Export
            </button>

            <button
              className={Styles.MasterAdminNavAddUserButton}
              onClick={handleOpen}
            >
              Add User
            </button>
          </div>
        </div>

        <div className={Styles.MasterAdminTabsContainerTable}>
          <div className="TableFilter">
            <div className="Search">
              <input
                placeholder="Search the list..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <FormControl sx={{ minWidth: 200 }} className="TableStatus">
              <SelectStyledFilter
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <MenuItem value="Status">Status</MenuItem>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Deactive">Deactive</MenuItem>
              </SelectStyledFilter>
            </FormControl>
          </div>
          <table>
            <thead>
              <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover">{tableData()}</tbody>
          </table>
          <div className={Styles.MasterAdminTablePagination}>
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
              <p className="ModelPopupHeaderText">Add User</p>
              <CloseOutlinedIcon
                onClick={() => handleClose()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
              <div className="PageHeader" style={{ marginTop: "10px" }}>
                <p className="PageTableTitleText">Login Info</p>
              </div>

              <div className="InputContainer">
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">User Name</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          firstname: e.target.value,
                        })
                      }
                    />
                    {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Password</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="lastname"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          lastname: e.target.value,
                        })
                      }
                    />
                    {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                  </div>
                </div>
                <div className="PageHeader" style={{ marginTop: "30px" }}>
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
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          emailid: e.target.value,
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
                      inputProps={{ maxLength: 20 }}
                      name="mobilenumber"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                    <p className="InputCartText">Email</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="emailid"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                      inputProps={{ maxLength: 20 }}
                      name="mobilenumber"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                    <p className="InputCartText">Lagal Entity</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="addtess"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          addtess: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                    <p className="InputCartText">City</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="state"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          state: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                    <p className="InputCartText">Zip</p>
                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="date_added"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          date_added: e.target.value,
                        })
                      }
                    />

                    {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Status</p>

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
                    <p className="InputCartText">Role</p>

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
              <button className="CancelButton" onClick={() => handleClose()}>
                Cancel
              </button>
              <button
                className="SubmitButton"
                onClick={() => addNewMsterAdmin()}
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
              <p className="ModelPopupHeaderText">Edit User</p>
              <CloseOutlinedIcon
                onClick={() => handleCloseEdit()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
              <div className="PageHeader" style={{ marginTop: "10px" }}>
                <p className="PageTableTitleText">Login Info</p>
              </div>

              <div className="InputContainer">
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">User Name</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      defaultValue={userById.username}
                      name="username"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          firstname: e.target.value,
                        })
                      }
                    />
                    {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Password</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      defaultValue={userById.password}
                      name="password"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          lastname: e.target.value,
                        })
                      }
                    />
                    {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                  </div>
                </div>
                <div className="PageHeader" style={{ marginTop: "30px" }}>
                  <p className="PageTableTitleText">User Info</p>
                </div>
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">First Name</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      defaultValue={userById.firstname}
                      name="firstname"

                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          emailid: e.target.value,
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
                      inputProps={{ maxLength: 20 }}
                      defaultValue={userById.lastname}
                      name="lastname"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                    <p className="InputCartText">Email</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      defaultValue={userById.email}
                      name="email"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                      inputProps={{ maxLength: 20 }}
                      defaultValue={userById.phone}
                      name="phone"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                    <p className="InputCartText">Lagal Entity</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      defaultValue={userById.legalentity}
                      name="legalentity"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          addtess: e.target.value,
                        })
                      }
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
                      defaultValue={userById.street}
                      name="street"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                    <p className="InputCartText">City</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      defaultValue={userById.city}
                      name="city"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          state: e.target.value,
                        })
                      }
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
                      defaultValue={userById.state}
                      name="state"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
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
                    <p className="InputCartText">Zip</p>
                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      defaultValue={userById.zipcode}
                      name="zipcode"
                      onChange={(e) =>
                        setCreateMsterAdmin({
                          ...createMsterAdmin,
                          date_added: e.target.value,
                        })
                      }
                    />

                    {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Status</p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={userById.status}
                      onChange={handleChangeRole}
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
                    <p className="InputCartText">Role</p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={userById.role}
                      onChange={handleChangeRole}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value="Masteradmin">Master Admin</MenuItem>
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
                onClick={() => addNewMsterAdmin()}
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
export default MasterAdmin;
