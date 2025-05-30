import React, { useEffect, useState, useRef } from "react";
import HeaderPage from "../header/Header";
import Styles from "./Index.module.css";
import CoProducerssImage from "../../../assets/images/CoProducersImege.png";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

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
import { createNewCoProducers, deleteCoProducers, editCoProducers, getAllCoProducers, getByCoProducersId, getCoProducerByProducerId } from "../../../redux/Action";
import { toast } from 'react-toastify';


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

const CoProducers = () => {

    let dispatch = useDispatch();
  
    const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

      const coProducers = useSelector(
        (state) => state.coProducers.getCoProducersByProducersId
      );

      const coProducersId = useSelector(
        (state) => state.coProducers.getByCoProducersIdSuccessfull
      );
    
      const addCoProducers = useSelector(
        (state) => state.coProducers.addCoProducersSuccessfull
      );
    
      const editexitCoProducers = useSelector(
        (state) => state.coProducers.editCoProducersSuccessfull
      );

        const projectIdList = useSelector(
            (state) => state.projects.getProjectByIdSuccessfull
          );

          const deleteCoProducersResponse = useSelector(
            (state) => state.coProducers.deleteCoProducersIdSuccessfull
          );

           const initialErrorMessage =  {
            firstname: "",
            lastname: "",
            emailid: "",
            street: "",
            phone: "",
            legalentity:"",
            city: "",
            state: "",
            totalallocation:"",
            status: "",
            total_raised: "",
            entityelements: "",
            generalcomments: "",
              };
              
                  const [error, setError] = useState(initialErrorMessage);
          

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updateID, setUpdateID] = useState();
  const handleOpenEdit = (id) => {
    dispatch(getByCoProducersId(id));
    setOpenEdit(true);
    setUpdateID(id)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false);
   
  }
  const [role, setRole] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

        const [selectedStatus, setSelectedStatus] = useState("Status"); // For status filter  
        
        
            const handleStatusChange = (event) => {
              setSelectedStatus(event.target.value);
            };

  const [deleteConfimationModelOpen, setDeleteConfimationModelOpen] = useState(false);
      const handlesetDeleteConfimationModelOpen = (id) => 
        {
          setUpdateID(id)
          setDeleteConfimationModelOpen(true);
          dispatch(getByCoProducersId(id));
        }
      const handlesetDeleteConfimationModelClose = () => setDeleteConfimationModelOpen(false);
    
          
  const [createCoProducers, setCreateCoProducers] = useState({
    producersid:storedUser.userid,
    firstname: "",
    lastname: "",
    emailid: "",
    street: "",
    phone: "",
    legalentity:"",
    city: "",
    state: "",
    totalallocation:"",
    status: "",
    total_raised: "",
    entityelements: "",
    generalcomments: "",
  });

  const [updateCoProducers, setUpdateCoProducers] = useState({
    producersid:storedUser.userid,
    firstname: coProducersId.data?.firstname,
    lastname:  coProducersId.data?.lastname,
    emailid: coProducersId.data?.emailid,
    phone:  coProducersId.data?.phone,
    legalentity:  coProducersId.data?.legalentity,
    street:  coProducersId.data?.street,
    city:  coProducersId.data?.city,
    state:  coProducersId.data?.state,
    totalallocation:  coProducersId.data?.totalallocation,
    status: coProducersId.data?.status,
    total_raised: coProducersId.data?.total_raised,
    entityelements:  coProducersId.data?.entityelements,
    generalcomments:  coProducersId.data?.generalcomments,
  });
  

  // const addNewCoProducers = () => {

  //   handleClose();
  // };

  const updateCoproducers = ()=>{
    dispatch(editCoProducers({id :updateID},{data :updateCoProducers}));
    setOpenEdit(false);
  }
  const [allData, setAllData] = useState([]);


  // const addNewCoProducers = async () => {
  //   let error = {
  //     firstname: "",
  //     lastname: "",
  //     emailid: "",
  //     address: "",
  //     mobilenumber: "",
  //     city: "",
  //     state: "",
  //     zipcode: "",
  //     referralsource: "",
  //     accredited: "",
  //     dateadded: "",
  //     generalcomments: "",
  //     investorprobability: "",
  //   };
  
  //   let isValid = true;
  
  //   if (createInvestor.firstname === "") {
  //     error.firstname = "*Please enter the first name";
  //     isValid = false;
  //   }

  //   setError(error);
  
  //   // Stop function if validation fails
  //   if (!isValid) return;


  //   try {
  //     const response = await dispatch(createNewCoProducers(createCoProducers)).unwrap(); 
  
  //     if (response) {
        
  //       setAllData((prevData) => [
  //         ...prevData,
  //         {
  //           S_no: prevData.length + 1,
  //           CoProducers_Name: `${createCoProducers.firstname} ${createCoProducers.lastname}`,
  //           email: createCoProducers.emailid,
  //           state: createCoProducers.state,
  //           status: createCoProducers.status,
  //           final_Amount: createCoProducers.final_amount,
  //           action: (
  //             <div className="TableActionContainer">
  //               <EditOutlinedIcon
  //                 className="TableActionEditIcon"
  //                 onClick={() => handleOpenEdit(response.co_producersid)}
  //               />
  //               <Link to={`/co_producers_details/${response.co_producersid}`} className="Link">
  //                 <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" />
  //               </Link>
  //               <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" 
  //             />
  //             </div>
  //           ),
  //         },
  //       ]);
       
  //       setCreateCoProducers({
  //         firstname: "",
  //         lastname: "",
  //         emailid: "",
  //         address: "",
  //         mobilenumber: "",
  //         city: "",
  //         state: "",
  //         zipcode: "",
  //         county: "",
  //         accredited: "",
  //         date_added: "",
  //         general_comments: "",
  //         CoProducers_probability: "",
  //         CoProducers_projects: "",
  //         projectname: "",
  //         status: "",
  //         final_amount: "",
  //         invesment_method: "",
  //       });
  
  //       handleClose();
  //     }
  //   } catch (error) {
  //     console.error("Error adding Co-Producer:", error);
      
  //   }
  // };
  
  const addNewCoProducers = async () => {
    let error = {
      firstname: "",
      lastname: "",
      emailid: "",
      street: "",
      phone: "",
      legalentity:"",
      city: "",
      state: "",
      totalallocation:"",
      status: "",
      total_raised: "",
      entityelements: "",
      generalcomments: "",
    };
  
    let isValid = true;
  
    if (createCoProducers.firstname === "") {
      error.firstname = "*Please enter the first name";
      isValid = false;
    }
    if (createCoProducers.lastname === "") {
      error.lastname = "*Please enter the last name";
      isValid = false;
    }
    if (createCoProducers.emailid === "") {
      error.emailid = "*Please enter the email-id";
      isValid = false;
    }
    if (createCoProducers.street === "") {
      error.street = "*Please enter the street";
      isValid = false;
    }
    if (createCoProducers.phone === "") {
      error.phone = "*Please enter the mobile number";
      isValid = false;
    }
    if (createCoProducers.legalentity === "") {
      error.legalentity = "*Please enter the legal entity";
      isValid = false;
    }
    if (createCoProducers.city === "") {
      error.city = "*Please enter the city";
      isValid = false;
    }
    if (createCoProducers.state === "") {
      error.state = "*Please enter the state";
      isValid = false;
    }
    if (createCoProducers.totalallocation === "") {
      error.totalallocation = "*Please enter the total allocation";
      isValid = false;
    }
    if (createCoProducers.status === "") {
      error.status = "*Please slect the status";
      isValid = false;
    }
    if (createCoProducers.total_raised === "") {
      error.total_raised = "*Please enter the total raised";
      isValid = false;
    }
    if (createCoProducers.entityelements === "") {
      error.entityelements = "*Please enter the entity elements";
      isValid = false;
    }
    if (createCoProducers.generalcomments === "") {
      error.generalcomments = "*Please enter the general comments";
      isValid = false;
    }

  
    // Update error state regardless
    setError(error);
  
    // Stop execution if form is invalid
    if (!isValid) return;
  
    try {
      const response = await dispatch(createNewCoProducers(createCoProducers)).unwrap();
  
      if (response) {
        setAllData((prevData) => [
          ...prevData,
          {
            S_no: prevData.length + 1,
            CoProducers_Name: `${createCoProducers.firstname} ${createCoProducers.lastname}`,
            email: createCoProducers.emailid,
            state: createCoProducers.state,
            status: createCoProducers.status,
            final_Amount: createCoProducers.final_amount,
            action: (
              <div className="TableActionContainer">
                <EditOutlinedIcon
                  className="TableActionEditIcon"
                  onClick={() => handleOpenEdit(response.co_producersid)}
                />
                <Link to={`/co_producers_details/${response.co_producersid}`} className="Link">
                  <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" />
                </Link>
                <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" />
              </div>
            ),
          },
        ]);
  
        // Reset form values
        setCreateCoProducers({
          firstname: "",
          lastname: "",
          emailid: "",
          address: "",
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
  
        // Close modal on success
        handleClose();
        setOpen(false);
      }
    } catch (err) {
      console.error("Error adding Co-Producer:", err);
    }
  };
  
  
  

  useEffect(()=>{
        if(addCoProducers !== "" || addCoProducers !== null || addCoProducers !== undefined){
       
          dispatch(getCoProducerByProducerId(storedUser.userid));
         
        }
        if(editexitCoProducers !== "" || editexitCoProducers !== null || editexitCoProducers !== undefined){
       
          dispatch(getCoProducerByProducerId(storedUser.userid));
         
        }

  
  },[addCoProducers,editexitCoProducers])


  const handleDeleteCoProducers=()=>{
    dispatch(deleteCoProducers(updateID))
    setDeleteConfimationModelOpen(false)

    if(deleteCoProducersResponse.message === "Error deleting coproducers"){
        toast.error("You can't remove the co-producers until you've deleted their party's");
          } else {
            toast.success("co=producers deleted successfully !!!");
          }
  }

    const tableHead = {
      S_no: "S.no",
      CoProducers_Name: "CoProducers Name",
      email: "Email",
      state: "State",
      status: "Status",
      final_Amount: "Final Amount",
      action: "Actions",
    };
  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

   useEffect(() => {
      dispatch(getCoProducerByProducerId(storedUser.userid));
    }, []);

    useEffect(() => {
        if (coProducers?.data) {
          const mappedData = coProducers?.data.map((item, index) => ({
            S_no: index + 1,
            CoProducers_Name: `${item.firstname} ${item.lastname}`,
            email: item.emailid,
            state: item.state,
            status: item.status,
            final_Amount: item.total_raised,
            action: (
              <div className="TableActionContainer">
              <EditOutlinedIcon className="TableActionEditIcon" onClick={()=> handleOpenEdit(item.co_producersid)} />
              <Link to={`/co_producers_details/${item.co_producersid}`} className="Link">
              <RemoveRedEyeOutlinedIcon
                className="TableActionViewIcon"
              />
              </Link>
              <DeleteOutlineOutlinedIcon
                className="TableActionDeleteIcon"
                onClick={()=> handlesetDeleteConfimationModelOpen(item.co_producersid)}
              />
            </div>
            ),
          }));
          setAllData(mappedData);
          setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
        }
      }, [coProducers]);
 
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

  const exportRawCoProducersToCSV = () => {
    if (!coProducers?.data || coProducers.data.length === 0) {
      toast.warning("No CoProducers data available to export.");
      return;
    }
  
    const rawData = coProducers.data;
    const header = Object.keys(rawData[0]).filter(key => typeof rawData[0][key] !== "object");
  
    const replacer = (key, value) => (value === null || value === undefined ? "" : value);
    const csv = [
      header.join(","),
      ...rawData.map(row =>
        header.map(field => JSON.stringify(row[field], replacer)).join(",")
      ),
    ].join("\r\n");
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "CoProducers_FullData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  
  return (
   <div className={Styles.CoProducersPageMainContainer}>
      <HeaderPage />
      <div className={Styles.CoProducersPageMainContent}>
        <div className={Styles.CoProducersPageMainNavContainer}>
          <div className={Styles.CoProducersPagenavCart}>
            <img
              src={CoProducerssImage}
              alt=""
              className={Styles.CoProducersPagenavCartImg}
            />
            <p className={Styles.CoProducersPagenavCartText}>CoProducers</p>
          </div>
          <div className={Styles.CreateCoProducersButtonContent}>
          <button
            className={Styles.CreateCoProducersButtonContentExportButton}
            onClick={exportRawCoProducersToCSV}
          >
            Export
          </button>

            <button
              className={Styles.ViewCoProducersPageNavContainerButton}
              onClick={handleOpen}
            >
              Add CoProducers
            </button>
          </div>
        </div>
        <div className={Styles.CoProducersPageTabsContainerTable}>
        <div className="TableFilter">
          <div className="Search">
            <input
              placeholder="Search Campaign"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <FormControl sx={{ minWidth: 200, }} className="TableStatus">
                          <SelectStyledFilter value={selectedStatus} onChange={handleStatusChange}>
                          <MenuItem value="Status">Status</MenuItem>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Active Raising">Still Raising</MenuItem>
                          </SelectStyledFilter>
                      </FormControl>

                      <FormControl sx={{ minWidth: 200, }} className="TableStatus">
                          <SelectStyledFilter value={selectedStatus} onChange={handleStatusChange}>
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
          <div className={Styles.CoProducersPageTablePagination}>
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
          <div className={Styles.CreateCoProducersMainContainer}>
            <div className="ModelPopupHeader sam">
                            <p className="ModelPopupHeaderText">
                            Add Co-Producer
                            </p>
                            <CloseOutlinedIcon
                              onClick={() => handleClose()}
                              className="ModelPopupHeaderIcon"
                            />
                          </div>
            <div className="ModelPopupbody">
            <div className={Styles.CreateCoProducersInputContainer}>
              <div className={Styles.CreateCoProducersInputContent}>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    First Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="firstname"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        firstname: e.target.value,
                      })
                    }
                  />
                  {error?.firstname && (
              <span className="validationErrorMsg">{error?.firstname}</span>
            )}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Last Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="lastname"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        lastname: e.target.value,
                      })
                    }
                  />
                   {error?.lastname && (
              <span className="validationErrorMsg">{error?.lastname}</span>
            )}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>Email</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="emailid"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        emailid: e.target.value,
                      })
                    }
                  />
                   {error?.emailid && (
              <span className="validationErrorMsg">{error?.emailid}</span>
            )}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>Phone</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="mobilenumber"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        phone: e.target.value,
                      })
                    }
                  />
                 {error?.phone && (
              <span className="validationErrorMsg">{error?.phone}</span>
            )}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>
              <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                      Legal Entity
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="addtess"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        legalentity: e.target.value,
                      })
                    }
                  />
                  {error?.legalentity && (
              <span className="validationErrorMsg">{error?.legalentity}</span>
            )}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Street 
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="addtess"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        street: e.target.value,
                      })
                    }
                  />
                  {error?.street && (
              <span className="validationErrorMsg">{error?.street}</span>
            )}
                </div>
                </div>
                <div className={Styles.CreateCoProducersInputContent}>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>City</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="city"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        city: e.target.value,
                      })
                    }
                  />
                     {error?.city && (
              <span className="validationErrorMsg">{error?.city}</span>
            )}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>State</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="state"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        state: e.target.value,
                      })
                    }
                  />
                  {error?.state && (
              <span className="validationErrorMsg">{error?.state}</span>
            )}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>                
               
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>Total Allocation</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="zipcode"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        totalallocation: e.target.value,
                      })
                    }
                  />
                 {error?.totalallocation && (
              <span className="validationErrorMsg">{error?.totalallocation}</span>
            )}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>                
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                  Status
                  </p>

                  {/* <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={createCoProducers.status}
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        status: e.target.value,
                      })
                    }
                  >
                     <MenuItem value="-None-">-None-</MenuItem>
                    <MenuItem value="Interested">Interested</MenuItem>
                    <MenuItem value="Investing In Project">Investing In Project</MenuItem>
                    <MenuItem value="Passing On Project">Passing On Project</MenuItem>
                  </SelectStyled> */}

                  <select  class="SearchSelectFilter"
                            value={createCoProducers.status}
                            onChange={(e) =>
                              setCreateCoProducers({
                                ...createCoProducers,
                                status: e.target.value,
                              })
                            }>
                        <option value="None">-None-</option>
                        <option value="Interested">Interested</option>
                        <option value="Investing In Project">Investing In Project</option>
                         <option value="Passing On Project">Passing On Project</option>
                        </select>
                  {error?.status && (
              <span className="validationErrorMsg">{error?.status}</span>
            )}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Total Raised
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="date_added"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        total_raised: e.target.value,
                      })
                    }
                  />
                   {error?.total_raised && (
              <span className="validationErrorMsg">{error?.total_raised}</span>
            )}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>
                
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Entitlement
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="entityelements"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        entityelements: e.target.value,
                      })
                    }
                  />
                  {error?.entityelements && (
              <span className="validationErrorMsg">{error?.entityelements}</span>
            )}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                <p className={Styles.CreateCoProducersInputCartText}>
                  General Comments
                </p>
                <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50000 }}
                      name="generalcomments"
                      multiline
                      rows={4}
                      onChange={(e) =>
                        setCreateCoProducers({
                          ...createCoProducers,
                          generalcomments: e.target.value,
                        })
                      }
                    />
                {error?.generalcomments && (
              <span className="validationErrorMsg">{error?.generalcomments}</span>
            )}
              </div>
              </div>
             
            </div>
            </div>
            <div className="ModelPopupfooter sam">
              <button
                className={Styles.CreateCoProducersCancelButton}
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className={Styles.CreateCoProducersSubmitButton}
                onClick={() => addNewCoProducers()}
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
          <div className={Styles.CreateCoProducersMainContainer}>
            <div className="ModelPopupHeader sam">
                            <p className="ModelPopupHeaderText">
                            Edit Co-Producer
                            </p>
                            <CloseOutlinedIcon
                              onClick={() => handleCloseEdit()}
                              className="ModelPopupHeaderIcon"
                            />
                          </div>
                          <div className="ModelPopupbody">
            <div className={Styles.CreateCoProducersInputContainer}>
              <div className={Styles.CreateCoProducersInputContent}>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    First Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    value={coProducersId.data?.firstname}
                    name="firstname"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        firstname: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Last Name
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    value={coProducersId.data?.lastname}
                    name="lastname"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        lastname: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>Email</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    value={coProducersId.data?.emailid}
                    name="emailid"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        emailid: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>Phone</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                   value={coProducersId.data?.phone}
                    name="phone"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        phone: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>
              <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                      Legal Entity
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    value={coProducersId.data?.legalentity}
                    name="legalentity"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        legalentity: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Street 
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    value={coProducersId.data?.street}
                    name="street"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        street: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                </div>
                <div className={Styles.CreateCoProducersInputContent}>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>City</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    value={coProducersId.data?.city}
                    name="city"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        city: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>State</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    value={coProducersId.data?.state}
                    name="state"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        state: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>                
               
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>Total Allocation</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    name="totalallocation"
                   value={coProducersId.data?.totalallocation}
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        totalallocation: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>                
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Status
                  </p>

                  {/* <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={coProducersId.data?.status}
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        status: e.target.value,
                      })
                    }
                  >
                     <MenuItem value="-None-">-None-</MenuItem>
                    <MenuItem value="Interested">Interested</MenuItem>
                    <MenuItem value="Investing In Project">Investing In Project</MenuItem>
                    <MenuItem value="Passing On Project">Passing On Project</MenuItem>
                  </SelectStyled> */}

                  <select  class="SearchSelectFilter"
                           value={coProducersId.data?.status}
                           onChange={(e) =>
                             setUpdateCoProducers({
                               ...updateCoProducers,
                               status: e.target.value,
                             })
                           }>
                        <option value="None">-None-</option>
                        <option value="Interested">Interested</option>
                        <option value="Investing In Project">Investing In Project</option>
                         <option value="Passing On Project">Passing On Project</option>
                        </select>
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Total Raised
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    value={coProducersId.data?.total_raised}
                    name="total_raised"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        total_raised: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>
                
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Entitlement
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                   value={coProducersId.data?.entityelements}
                    name="entityelements"
                    onChange={(e) =>
                      setUpdateCoProducers({
                        ...updateCoProducers,
                        entityelements: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                <p className={Styles.CreateCoProducersInputCartText}>
                  General Comments
                </p>
                <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50000 }}
                      value={coProducersId.data?.generalcomments}
                      name="generalcomments"
                      multiline
                      rows={4}
                      onChange={(e) =>
                        setUpdateCoProducers({
                          ...updateCoProducers,
                          generalcomments: e.target.value,
                        })
                      }                    />
                {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
              </div>
              </div>
             
            </div>
            </div>
            <div className="ModelPopupfooter sam">
              <button
                className={Styles.CreateCoProducersCancelButton}
                onClick={() => handleCloseEdit()}
              >
                Cancel
              </button>
              <button
                className={Styles.CreateCoProducersSubmitButton}
                onClick={() => updateCoproducers()}
              >
                Submit
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
                      
                        <div className={Styles.coProducerPageModelPopupContainer}>
                          <div className="ModelPopupHeader">
                            <p className="ModelPopupHeaderText">Delete Co-Producers</p>
                            <CloseOutlinedIcon
                              onClick={() => handlesetDeleteConfimationModelClose()}
                              className="ModelPopupHeaderIcon"
                            />
                          </div>
                          <div className="ModelPopupbody">
                          <p className={Styles.coProducerPageModelPopupContainerDeteleText}>
                            Do you really want to remove the Co-producer : <span className={Styles.coProducersPageModelPopupContainerDeteleTextProducerName}>{coProducersId.data?.firstname}{ coProducersId.data?.lastname}</span> 
                            </p>
                          </div>
                          <div className="ModelPopupfooter">
                            <button
                              className={Styles.CreateCoProducersCancelButton}
                              onClick={() => handlesetDeleteConfimationModelClose()}
                            >
                              No !
                            </button>
                            <button
                              className={Styles.CreateCoProducersSubmitButton}
                              onClick={() => handleDeleteCoProducers()}
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
export default CoProducers;
