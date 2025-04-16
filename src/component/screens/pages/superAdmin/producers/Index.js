import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import SuperAdminHeaderPage from "../superAdminHeader/Index";
import ProducersImageAdminView from "../../../../assets/images/ProducersImageAdminView.png";
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
import { getAllUsers,addUsers,getByUserId,deleteUser, editExitUsers } from "../../../../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

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
    border-color: rgb(91, 92, 94);
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
    color: rgb(13, 13, 14) !important;
    border-radius: 6px;
    transition: border-color 0.2s ease-in-out;

    & fieldset {
      border-color: rgb(87, 87, 88) !important;
    }

    &:hover fieldset {
      border-color: rgb(45, 45, 46) !important;
    }

    &.Mui-disabled fieldset {
      border-color: rgb(49, 50, 51) !important;
    }
  }
`;
export const SelectStyledFilter = styled(Select)`
      & .MuiOutlinedInput-root {
        font-size: 14px;
        color: rgb(13, 13, 14) !important;
        border-radius: 8px;
        transition: border-color 0.2s ease-in-out;
        display: flex;
        align-items: center; / Center text vertically /
        height: 36px; / Reduce height to match image /
    
        & fieldset {
          border-color: rgb(166, 167, 172) !important;
        }
    
        &:hover fieldset {
          border-color: rgb(166, 167, 172) !important;
        }
    
        &.Mui-disabled fieldset {
          border-color: rgb(166, 167, 172) ;
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

const Producers = () => {
  let dispatch = useDispatch();

  const userList = useSelector((state) => state.users.getAllUsersSuccessfull);
  const userById = useSelector((state) => state.users.getByUserIdSuccessfull);

  const editUsersSuccessfull = useSelector((state) => state.users.editUsersSuccessfull);

  const deleteProducer = useSelector((state) => state.users.deleteUserIdSuccessfull);

  const [deleteTriggered, setDeleteTriggered] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);

const [updateId,setUpdateId]=useState();
  const [role, setRole] = useState(10);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };


  const [deleteConfimationModelOpen, setDeleteConfimationModelOpen] = useState(false);
  const handlesetDeleteConfimationModelOpen = (id) => 
    {
      setUpdateId(id)
      setDeleteConfimationModelOpen(true);
      dispatch(getByUserId(id));
    }
  const handlesetDeleteConfimationModelClose = () => setDeleteConfimationModelOpen(false);

  

  const [allData, setAllData] = useState([]);

  
  const [producerUser, setProducerUser] = useState(
    {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      legalentity: "",
      street: "",
      city: "",
      state: "",
      role: "",
      zipcode: "",
      status: "",
  }
  )

  const [updateProducerUser, setUpdateProducerUser] = useState(
    {
      username: userById.username,
      password: userById.password,
      firstname: userById.firstname,
      lastname: userById.lastname,
      email: userById.email,
      phone: userById.phone,
      legalentity:userById.legalentity,
      street:userById.street,
      city:userById.city,
      state:userById.state,
      role: userById.role,
      zipcode: userById.zipcode,
      status:userById.status,
  }
  )

  console.log(producerUser,"producerUser") 
  
  // const handleGetByID = async (id) => {
  //   try {
  //     setUpdateId(id);
  //     const response = await dispatch(getByUserId(id)); 
  
  //     // You can also check response.meta.requestStatus === 'fulfilled'
  //     if (response?.payload) {
  //       setUpdateProducerUser(response.payload); 
  //       setOpenEdit(true); // Open modal only on success
  //     } else {
  //       throw new Error("No data received");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     toast.error("Failed to load user data");
  //   }
  // };
  
  const handleGetByID = async (id) => {
    setOpenEdit(false); // Close modal first (optional)
    setUpdateProducerUser({}); // Clear previous data
    setUpdateId(id); // Set new ID
  
    try {
      const response = await dispatch(getByUserId(id));
      if (response?.payload) {
        setUpdateProducerUser(response.payload);
        setOpenEdit(true); // Open modal only on success
      } else {
        throw new Error("No data received");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    }
  };
  
  
  
  // Close the edit modal and reset the form
  // const handleCloseEdit = () => {
  //   setOpenEdit(false);
  //   setUpdateProducerUser({});
  // };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setUpdateId(null);
    setUpdateProducerUser({});
  };
  // Sync updateProducerUser state when userById updates
  useEffect(() => {
    if (userById) {
      setUpdateProducerUser({
        username: userById.username || "",
        password: userById.password || "",
        firstname: userById.firstname || "",
        lastname: userById.lastname || "",
        email: userById.email || "",
        phone: userById.phone || "",
        legalentity: userById.legalentity || "",
        street: userById.street || "",
        city: userById.city || "",
        state: userById.state || "",
        role: userById.role || "",
        zipcode: userById.zipcode || "",
        status: userById.status || "",
      });
    }
  }, [userById]);
  
    // const handleCloseEdit = (id) => {
    //   dispatch(getByUserId(id))
    //   setOpenEdit(false);
    // }

    
    useEffect(() => {
      if (userList) {
        const mappedData = userList.map((item, index) => ({
          S_no: index + 1,
          name: `${item.firstname} ${item.lastname}`,
          email: item.username,
          phone: item.phone,
          state: item.state,
          city: item.city,
          zip: item.zipcode,
          status: item.status,
          action: (
            <div className="TableActionContainer">
              <EditOutlinedIcon
                className="TableActionEditIcon"
                onClick={() => handleGetByID(item.userid)}
              />
              <Link to={`/producers_details/${item.userid}`} className="Link">
                <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" />
              </Link>
              <DeleteOutlineOutlinedIcon
                className="TableActionDeleteIcon"
                onClick={() => handlesetDeleteConfimationModelOpen(item.userid)}
              />
            </div>
          ),
        }));
    
        setAllData(mappedData);
        setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
      }
    }, [userList]);  
    

    
    const handleUpdateProducer =()=>{
      dispatch(editExitUsers({ updateId, updateProducerUser }))
          setOpenEdit(false);
          if (editUsersSuccessfull !== "" || editUsersSuccessfull !== undefined || editUsersSuccessfull !== null){
            setTimeout(() => {
            dispatch(getAllUsers());
            toast.success("Producer updated successfully")
          }, 300);
          }else{
            toast.error("Something Error While update the Producer")
          }
    }
    
   
    
   const handleDeleteEdit = () => {
  dispatch(deleteUser(updateId));
  setDeleteTriggered(true);
};

useEffect(() => {
  if (!deleteTriggered) return;

  if (deleteProducer.message === "Error deleting user") {
    toast.error("You can't remove the producers until you've deleted their projects.");
    setDeleteConfimationModelOpen(false);
    setDeleteTriggered(false);
  } else if (deleteProducer.message === "User deleted successfully") {
    toast.success("Producer deleted successfully");
    dispatch(getAllUsers());
    setDeleteConfimationModelOpen(false);
    setDeleteTriggered(false);
  }
}, [deleteProducer.message, deleteTriggered]);

    
    
  const tableHead = [
    "No.",
    "Name",
    "Email",
    "Phone",
    "State",
    "City",
    "ZipCode",
    "Status",
    "Actions",
  ];


  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  // const handleAddUser = () => {
  //   dispatch(addUsers(producerUser));
  //   setOpen(false);
  // }


  const handleAddUser = async () => {
    try {
      const response = await dispatch(addUsers(producerUser));
  
      if (response?.payload) {
        toast.success("Producer Added Successfully!!!")
        window.location.reload();
        const newUser = {
          S_no: allData.length + 1,
          name: `${response.payload.firstname} ${response.payload.lastname}`,
          email: response.payload.username,
          phone: response.payload.phone,
          state: response.payload.state,
          city: response.payload.city,
          zip: response.payload.zipcode,
          status: response.payload.status,
          action: (
            <div className="TableActionContainer">
              <EditOutlinedIcon className="TableActionEditIcon" />
              <Link to="/producers_details" className="Link">
                <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" />
              </Link>
              <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" />
            </div>
          ),
        };
  
        setAllData((prevData) => [newUser, ...prevData]);
        setCollection((prevCollection) => [newUser, ...prevCollection]);
       
        setOpen(false);
        setProducerUser({
          username: "",
          password: "",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          legalentity: "",
          street: "",
          city: "",
          state: "",
          role: "",
          zipcode: "",
          status: "",
        });


      }
     
    } catch (error) {
      // console.error("Error adding user:", error);
      toast.error("Failed to add Producer. Please try again.");
    }
  };
  

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
    dispatch(getAllUsers());
  }, []);

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
    if (!userList || userList.length === 0) {
      toast.warn("No users to export");
      return;
    }
  
    // Step 1: Collect all unique keys from userList
    const allKeys = Array.from(
      new Set(userList.flatMap(user => Object.keys(user)))
    );
  
    // Step 2: Create CSV header row
    const headers = allKeys;
  
    // Step 3: Create CSV data rows
    const rows = userList.map(user =>
      allKeys.map(key => {
        const value = user[key];
        // Convert objects or arrays to JSON string
        if (typeof value === "object" && value !== null) {
          return `"${JSON.stringify(value)}"`;
        }
        return `"${value !== undefined ? value : ""}"`;
      })
    );
  
    // Step 4: Combine header and rows
    const csvContent = [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");
  
    // Step 5: Trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "producersList.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  

  return (
    <div className={Styles.ProducersMainContainer}>
      <SuperAdminHeaderPage />
      <div className={Styles.ProducersPage}>
        <div className={Styles.ProducersPageNav}>
          <p className={Styles.ProducersPageNavText}>
            <img
              className={Styles.ProducersPageNavImg}
              src={ProducersImageAdminView}
              alt="ProducersImageAdminView"
            />
            Producers
          </p>
          <div className={Styles.ProducersPageNavButtonContainer}>
          <button
            className={Styles.ProducersPageNavExportButton}
            onClick={handleExportCSV}
          >
            Export
          </button>

            <button
              className={Styles.ProducersPageNavAddProducersButton}
              onClick={() => handleOpen()}
            >
              Add Producer
            </button>
          </div>
        </div>

        <div className={Styles.ProducersPageTabsContainerTable}>
          <div className="TableFilter">
            <div class="Search">
              <input
                style={{ minWidth: "100% !important" }}
                placeholder="Search the producers..."
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
             
              <select name="cars" id="cars" class="SearchSelectFilter">
              <option value="Status">Show</option>
              <option value="All">All</option>
              <option value="Newest First">Newest First</option>
            </select>
            </FormControl>
          </div>
          <table>
            <thead>
              <tr>
                {tableHead.map((title, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {collection.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row).map((key, i) => (
                    <td key={i}>{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={Styles.ProducersPageTablePagination}>
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
        <Box class="modal">
          <div className={Styles.ProducersPageModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">Add Producers</p>
              <CloseOutlinedIcon
                onClick={() => handleClose()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
              <div className={Styles.ProducersPageTitleContainer}>
                <p className={Styles.ProducersPageTitle}>Login Info</p>
              </div>
              <div className={Styles.ProducersPageInputContainer}>
                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Username (Email-ID)
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="username"
                      onChange={(e) => setProducerUser({ ...producerUser, username: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Password
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="password"
                      onChange={(e) => setProducerUser({ ...producerUser, password: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                </div>

                <div className={Styles.ProducersPageTitleContainer}>
                  <p className={Styles.ProducersPageTitle}>Producer Info</p>
                </div>
                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Fist Name
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="firstname"
                      onChange={(e) => setProducerUser({ ...producerUser, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Last Name
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="lastname"
                      onChange={(e) => setProducerUser({ ...producerUser, lastname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>Phone</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="phone"
                      onChange={(e) => setProducerUser({ ...producerUser, phone: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Legal Entity
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="legalentity"
                      onChange={(e) => setProducerUser({ ...producerUser, legalentity: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>Street</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="street"
                      onChange={(e) => setProducerUser({ ...producerUser, street: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>

                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>City</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="city"
                      onChange={(e) => setProducerUser({ ...producerUser, city: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>State</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="state"
                      onChange={(e) => setProducerUser({ ...producerUser, state: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Zip Code
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="zipcode"
                      onChange={(e) => setProducerUser({ ...producerUser, zipcode: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>Status</p>
                  
                    <select  class="SearchSelectFilterInput"
                      onChange={(e) => setProducerUser({ ...producerUser, status: e.target.value })}
                      >
                      <option value="None">None</option>
                      <option value="Acitve">acitve</option>
                      <option value="Inacitve">Inacitve</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={Styles.ProducersPageCancelButton}
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className={Styles.ProducersPageSubmitButton}
                onClick={() => handleAddUser()}
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
        <Box class="modal">
        
          <div className={Styles.ProducersPageModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">Edit Producers</p>
              <CloseOutlinedIcon
                onClick={() => handleCloseEdit()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
              <div className={Styles.ProducersPageTitleContainer}>
                <p className={Styles.ProducersPageTitle}>Login Info</p>
              </div>
              <div className={Styles.ProducersPageInputContainer}>
                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                        Username (Email-ID)
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      value={updateProducerUser.username || ""}
                      name="firstname"
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, username: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Password
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      value={updateProducerUser.password || ""}
                      name="lastname"
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, password: e.target.value })}                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                </div>

                <div className={Styles.ProducersPageTitleContainer}>
                  <p className={Styles.ProducersPageTitle}>Producer Info</p>
                </div>
                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Fist Name
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      value={updateProducerUser.firstname || ""}
                      name="firstname"
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, firstname: e.target.value })}
                      />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Last Name
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      value={updateProducerUser.lastname || ""}
                      name="firstname"
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, lastname: e.target.value })}                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.ProducersPageInputContent}>
                
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>Phone</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      value={updateProducerUser.phone || ""}
                      name="phone"
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, phone: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Legal Entity
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="legalentity"
                      value={updateProducerUser.legalentity || ""}
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, legalentity: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>Street</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="street"
                      value={updateProducerUser.street || ""}
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, street: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>

                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>City</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="city"
                      value={updateProducerUser.city || ""}
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, city: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>State</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="firstname"
                      value={updateProducerUser.state || ""}
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, state: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                <div className={Styles.ProducersPageInputContent}>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>
                      Zip Code
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="zipcode"
                      value={updateProducerUser.zipcode || ""}
                      onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, zipcode: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.ProducersPageInputCart}>
                    <p className={Styles.ProducersPageInputCartText}>Status</p>
                   
                    <select  class="SearchSelectFilterInput"
                    value={updateProducerUser.status || ""}
                     key={userById.status}
                       onChange={(e) => setUpdateProducerUser({ ...updateProducerUser, status: e.target.value })}
                      >
                      <option value="None">None</option>
                      <option value="Acitve">acitve</option>
                      <option value="Inacitve">Inacitve</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={Styles.ProducersPageCancelButton}
                onClick={() => handleCloseEdit()}
              >
                Cancel
              </button>
              <button
                className={Styles.ProducersPageSubmitButton}
                onClick={() => handleUpdateProducer()}
              >
                Save
              </button>
            </div>
          </div>
          
        </Box>
      </Modal>

      <Modal
        open={deleteConfimationModelOpen}
        onClose={handlesetDeleteConfimationModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box class="modal">
        
          <div className={Styles.ProducersPageModelPopupContainer}>
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">Delete Producers</p>
              <CloseOutlinedIcon
                onClick={() => handlesetDeleteConfimationModelClose()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
            <p className={Styles.ProducersPageModelPopupContainerDeteleText}>
              Do you really want to remove the producer : <span className={Styles.ProducersPageModelPopupContainerDeteleTextProducerName}>{updateProducerUser.firstname} {updateProducerUser.lastname}</span> 
              </p>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={Styles.ProducersPageCancelButton}
                onClick={() => handlesetDeleteConfimationModelClose()}
              >
                No !
              </button>
              <button
                className={Styles.ProducersPageSubmitButton}
                onClick={() => handleDeleteEdit()}
              >
                Yes !
              </button>
            </div>
          </div>
          
        </Box>
      </Modal>
    </div>
  );
};
export default Producers;
