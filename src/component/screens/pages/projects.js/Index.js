import React from "react";
import Styles from "./Index.module.css";
import HeaderPage from "../header/Header";
import ProjectsImage from "../../../assets/images/ProjectsImage.png";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CgOverflow } from "react-icons/cg";
import { Height } from "@mui/icons-material";
import { borderRadius } from "@mui/system";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useEffect } from "react";
import { useRef } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjects,
  deleteProject,
  getAllProjects,
  getProjectByProducerId,
  getProjectsByID,
  updateProjects,
} from "../../../redux/Action";
import { toast } from "react-toastify";

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
    border-color: #e1e1e1;
    color: rgb(13, 13, 14);
    font-size: 14px;

    & fieldset {
      border-color: #e1e1e1;
    }

    &:hover fieldset {
      border-color: #e1e1e1;
    }

    &.Mui-focused fieldset {
      border-color: #e1e1e1;
      border: 1px solid #e1e1e1;
    }

    &.Mui-active fieldset {
      border-color: #e1e1e1;
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
const ProjectsPage = () => {
  let dispatch = useDispatch();

  const projectList = useSelector(
    (state) => state.projects.getProjectbyProducerId
  );

  const projectIdList = useSelector(
    (state) => state.projects.getProjectByIdSuccessfull
  );

  const deleteProjectResponse = useSelector(
    (state) => state.projects.deleteProjectResponse
  );


  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const initialErrorMessage =  {
    projectname: "",
    projectsummary: "",
    status: "",
    startdate: "",
    deadline: "",
    uploadeddocument: "",
    billedname: "",
    totalcapitalization: "",
    totalallocation: "",
    totalraised: "",
    houseticketlink: "",
    houseticketcomments: "",
    generalcomments: "",
  };
  
      const [error, setError] = useState(initialErrorMessage);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setError(initialErrorMessage)
  }
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updateID, setUpdateID] = useState("");
  const handleOpenEdit = (projectid) => {
    dispatch(getProjectsByID(projectid));
    setUpdateID(projectid);
    setOpenEdit(true);
  };

  const [role, setRole] = useState("");

  const [allData, setAllData] = useState([]);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

    const [deleteConfimationModelOpen, setDeleteConfimationModelOpen] = useState(false);
    const handlesetDeleteConfimationModelOpen = (id) => 
      {
        setUpdateID(id)
        setDeleteConfimationModelOpen(true);
        dispatch(getProjectsByID(id));
      }
    const handlesetDeleteConfimationModelClose = () => setDeleteConfimationModelOpen(false);
  


  const [selectedStatus, setSelectedStatus] = useState("Status");

  const [createProject, setCreateProject] = useState({
    producersid: storedUser.userid,
    projectname: "",
    projectsummary: "",
    status: "",
    startdate: "",
    deadline: "",
    uploadeddocument: "",
    billedname: "",
    totalcapitalization: "",
    totalallocation: "",
    totalraised: "",
    houseticketlink: "",
    houseticketcomments: "",
    generalcomments: "",
  });

  const [updateProject, setUpdateProject] = useState({
    producersid: storedUser.userid,
    projectname: "",
    projectsummary: "",
    status: "",
    startdate: "",
    deadline: "",
    uploadeddocument: "",
    billedname: "",
    totalcapitalization: "",
    totalallocation: "",
    totalraised: "",
    houseticketlink: "",
    houseticketcomments: "",
    generalcomments: "",
  });

  console.log(createProject, "createProject");

  // const handleCreatePRoject = () => {
  //   dispatch(createProjects(createProject));
  //   handleClose();
  // };

  // const handleCreateProject = async () => {

  //   let error = {
  //     projectname: "",
  //     projectsummary: "",
  //     status: "",
  //     startdate: "",
  //     deadline: "",
  //     uploadeddocument: "",
  //     billedname: "",
  //     totalcapitalization: "",
  //     totalallocation: "",
  //     totalraised: "",
  //     houseticketlink: "",
  //     houseticketcomments: "",
  //     generalcomments: "",
  //   };

  //   let isValid = true;
  
  //   if (createProject.projectname === "") {
  //     error.projectname = "*Please select the project name";
  //     isValid = false;
  //   }

  //   setError(error);
  

  //   try {
  //     const response = await dispatch(createProjects(createProject));

  //     if (response?.payload) {
  //       toast.success("Project Created Successfully!!!");

  //       const newProject = {
  //         S_no: allData.length + 1,
  //         projectname: response.payload.projectname,
  //         status: response.payload.status,
  //         startdate: response.payload.startdate,
  //         houseticket: response.payload.houseticketlink,
  //         billedname: response.payload.billedname,
  //         totalraised: response.payload.totalraised,
  //         action: (
  //           <div className={Styles.projectTableActionContainer}>
  //             <EditOutlinedIcon
  //               className={Styles.ProjectTableActionEditIcon}
  //               onClick={() => handleOpenEdit(response.payload.projectid)}
  //             />
  //             <Link
  //               to={`/project_details/${response.payload.projectid}`}
  //               className="Link"
  //             >
  //               <RemoveRedEyeOutlinedIcon
  //                 className={Styles.ProjectsTableActionViewIcon}
  //               />
  //             </Link>
  //             <DeleteOutlineOutlinedIcon
             
  //               className={Styles.ProjectsTableActionDeleteIcon}
  //             />
  //           </div>
  //         ),
  //       };

  //       setAllData((prevData) => [newProject, ...prevData]);
  //       setCollection((prevCollection) => [newProject, ...prevCollection]);

  //       setOpen(false);
  //       setCreateProject({
  //         producersid: 1,
  //         projectname: "",
  //         projectsummary: "",
  //         status: "",
  //         startdate: "",
  //         deadline: "",
  //         uploadeddocument: "",
  //         billedname: "",
  //         totalcapitalization: "",
  //         totalallocation: "",
  //         totalraised: "",
  //         houseticketlink: "",
  //         houseticketcomments: "",
  //         generalcomments: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error creating project:", error);
  //     toast.error("Failed to create project. Please try again.");
  //   }
  // };

  const handleCreateProject = async () => {
    let error = {
      projectname: "",
      projectsummary: "",
      status: "",
      startdate: "",
      deadline: "",
      uploadeddocument: "",
      billedname: "",
      totalcapitalization: "",
      totalallocation: "",
      totalraised: "",
      houseticketlink: "",
      houseticketcomments: "",
      generalcomments: "",
    };
  
    let isValid = true;
  
    if (createProject.projectname === "") {
      error.projectname = "*Please enter the project name";
      isValid = false;
    }
    if (createProject.projectsummary === "") {
      error.projectsummary = "*Please enter the project summary";
      isValid = false;
    }
    if (createProject.status === "") {
      error.status = "*Please select a status";
      isValid = false;
    }
    if (createProject.startdate === "") {
      error.startdate = "*Please select a start date";
      isValid = false;
    }
    if (createProject.deadline === "") {
      error.deadline = "*Please select a deadline";
      isValid = false;
    }
    if (createProject.uploadeddocument === "") {
      error.uploadeddocument = "*Please upload a document";
      isValid = false;
    }
    if (createProject.billedname === "") {
      error.billedname = "*Please enter the billed name";
      isValid = false;
    }
    if (createProject.totalcapitalization === "") {
      error.totalcapitalization = "*Please enter total capitalization";
      isValid = false;
    }
    if (createProject.totalallocation === "") {
      error.totalallocation = "*Please enter total allocation";
      isValid = false;
    }
    if (createProject.totalraised === "") {
      error.totalraised = "*Please enter total raised";
      isValid = false;
    }
    if (createProject.houseticketlink === "") {
      error.houseticketlink = "*Please enter house ticket link";
      isValid = false;
    }
    if (createProject.houseticketcomments === "") {
      error.houseticketcomments = "*Please enter house ticket comments";
      isValid = false;
    }
    if (createProject.generalcomments === "") {
      error.generalcomments = "*Please enter general comments";
      isValid = false;
    }
  
    // Set validation error state
    setError(error);
  
    if (!isValid) return; // Skip dispatch if validation fails
  
    try {
      const response = await dispatch(createProjects(createProject));
  
      if (response?.payload) {
        toast.success("Project Created Successfully!!!");
  
        const newProject = {
          S_no: allData.length + 1,
          projectname: response.payload.projectname,
          status: response.payload.status,
          startdate: response.payload.startdate,
          houseticket: response.payload.houseticketlink,
          billedname: response.payload.billedname,
          totalraised: response.payload.totalraised,
          action: (
            <div className={Styles.projectTableActionContainer}>
              <EditOutlinedIcon
                className={Styles.ProjectTableActionEditIcon}
                onClick={() => handleOpenEdit(response.payload.projectid)}
              />
              <Link
                to={`/project_details/${response.payload.projectid}`}
                className="Link"
              >
                <RemoveRedEyeOutlinedIcon
                  className={Styles.ProjectsTableActionViewIcon}
                />
              </Link>
              <DeleteOutlineOutlinedIcon
                className={Styles.ProjectsTableActionDeleteIcon}
              />
            </div>
          ),
        };
  
        setAllData((prevData) => [newProject, ...prevData]);
        setCollection((prevCollection) => [newProject, ...prevCollection]);
  
        setOpen(false);
  
        setCreateProject({
          producersid: 1,
          projectname: "",
          projectsummary: "",
          status: "",
          startdate: "",
          deadline: "",
          uploadeddocument: "",
          billedname: "",
          totalcapitalization: "",
          totalallocation: "",
          totalraised: "",
          houseticketlink: "",
          houseticketcomments: "",
          generalcomments: "",
        });
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };
  

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateProject = async () => {
    if (!updateID) {
      toast.error("Project ID is missing!");
      return;
    }

    const updatedData = {
      projectname: updateProject.projectname || projectIdList.data?.projectname,
      projectsummary:
        updateProject.projectsummary || projectIdList.data?.projectsummary,
      status: updateProject.status || projectIdList.data?.status,
      startdate: updateProject.startdate || projectIdList.data?.startdate,
      deadline: updateProject.deadline || projectIdList.data?.deadline,
      uploadeddocument:
        updateProject.uploadeddocument || projectIdList.data?.uploadeddocument,
      billedname: updateProject.billedname || projectIdList.data?.billedname,
      totalcapitalization:
        updateProject.totalcapitalization ||
        projectIdList.data?.totalcapitalization,
      totalallocation:
        updateProject.totalallocation || projectIdList.data?.totalallocation,
      totalraised: updateProject.totalraised || projectIdList.data?.totalraised,
      houseticketlink:
        updateProject.houseticketlink || projectIdList.data?.houseticketlink,
      houseticketcomments:
        updateProject.houseticketcomments ||
        projectIdList.data?.houseticketcomments,
      generalcomments:
        updateProject.generalcomments || projectIdList.data?.generalcomments,
    };

    try {
      const response = await dispatch(
        updateProjects({ id: updateID, data: updatedData })
      );

      if (response?.payload) {
        toast.success("Project Updated Successfully!");

        // Refresh project list in Redux store
        dispatch(getAllProjects());

        // Close modal & reset input fields
        setOpenEdit(false);
        setUpdateProject({});
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(getProjectByProducerId(storedUser.userid));
  }, []);


  const handleDeleteProjects=()=>{
    dispatch(deleteProject(updateID));
   setDeleteConfimationModelOpen(false)

   if(deleteProjectResponse.message === "Error deleting project"){
    toast.error("You can't remove the Projects until you've deleted their Investors and Co_producers")
   }
   else{
    toast.success("project deleted successfully !!!")
   }
  }

  useEffect(() => {
    if (projectList?.data) {
      const mappedData = projectList.data.map((item, index) => ({
        S_no: index + 1,
        projectname: item.projectname,
        status: item.status,
        startdate: item.startdate,
        houseticket: item.houseticketlink,
        billedname: item.billedname,
        totalraised: item.totalraised,
        action: (
          <div className={Styles.projectTableActionContainer}>
            <EditOutlinedIcon
              className={Styles.ProjectTableActionEditIcon}
              onClick={() => handleOpenEdit(item.projectid)}
            />
            <Link to={`/project_details/${item.projectid}`} className="Link">
              <RemoveRedEyeOutlinedIcon
                className={Styles.ProjectsTableActionViewIcon}
              />
            </Link>
            <DeleteOutlineOutlinedIcon
             onClick={()=> handlesetDeleteConfimationModelOpen(item.projectid)}
              className={Styles.ProjectsTableActionDeleteIcon}
            />
          </div>
        ),
      }));
      setAllData(mappedData);
      setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
    }
  }, [projectList]);

  const tableHead = [
    "No.",
    "Project Name",
    "Status",
    "Start Date",
    "House Ticket",
    "Billed Name",
    "Total Raised",
    "Actions",
  ];
  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

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

  const handleExportCSV = () => {
    if (!projectList?.data || projectList.data.length === 0) {
      toast.error("No project data available to export.");
      return;
    }
  
    const allProjects = projectList.data;
  
    // Collect all unique keys across all items
    const headersSet = new Set();
    allProjects.forEach(project => {
      Object.keys(project).forEach(key => headersSet.add(key));
    });
  
    const headers = Array.from(headersSet);
  
    const csvRows = [
      headers.join(","), // header row
      ...allProjects.map(project =>
        headers.map(header =>
          `"${(project[header] ?? "").toString().replace(/"/g, '""')}"`
        ).join(",")
      )
    ];
  
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `projects_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  

  
  return (
    <div className={Styles.ProjectsPageMainContainer}>
      <HeaderPage />
      <div className={Styles.ProjectsPageContent}>
        <div className={Styles.ProjectsPageNavContainer}>
          <div className={Styles.ProjectsPageNavContainerLeftSide}>
            <img
              src={ProjectsImage}
              alt=""
              className={Styles.ProjectsPagenavCartImg}
            />
            <p className={Styles.ProjectsPagenavCartText}>Projects</p>
          </div>
          <div>
          <button
            className={Styles.ProjectsPageNavContainerExportButton}
            onClick={handleExportCSV}
          >
            Export
          </button>

            <button
              className={Styles.ProjectsPageNavContainerButton}
              onClick={handleOpen}
            >
              Add Projects
            </button>
          </div>
        </div>
        <div className={Styles.ProjectsPageTabsContainerTable}>
          <div className="TableFilter">
            <div className="Search">
              <input
                placeholder="Search Campaign"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <FormControl sx={{ minWidth: 200 }} className="TableStatus">
              

                <select name="cars" id="cars" class="SearchSelectFilter"
                 value={selectedStatus}
                 onChange={handleStatusChange}>
              <option value="Status">Status</option>
              <option value="All">All</option>
              <option value="Active Raising">Active Raising</option>
              <option value="Active Investment">Active Investment</option>
              <option value="Turned Down">Turned Down</option>
              <option value="Completed">Completed</option>
              <option value="Other">Other</option>
            </select>
             
            </FormControl>

            <FormControl sx={{ minWidth: 200 }} className="TableStatus">
             
              <select name="cars" id="cars" class="SearchSelectFilter"
                 value={selectedStatus}
                 onChange={handleStatusChange}>
              <option value="Status">Status</option>
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
          <div className={Styles.ProjectPageTablePagination}>
            <Pagination
              pageSize={countPerPage}
              onChange={updatePage}
              current={currentPage}
              total={allData.length}
            />
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal">
            <div className={Styles.ProjectsPageModelPopupContainer}>
              <div className={Styles.ProjectsPageModelPopupHeader}>
                <p className={Styles.ProjectsPageModelPopupHeaderText}>
                  New Projects
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleClose()}
                  className={Styles.ProjectsPageModelPopupHeaderTextIcon}
                />
              </div>
              <div className={Styles.ProjectsPageModelPopupbody}>
                <div className={Styles.CreateProjetsTitleContainer}>
                  <p className={Styles.CreateProjetsTitle}>
                    Projects Information
                  </p>
                </div>
                <div className={Styles.CreateProjectsInputContainer}>
                  <div className={Styles.CreateProjectsInputContent}>
                    <div className={Styles.CreateProjcetsInputCart}>
                      <p className={Styles.CreateProjectsInputCartText}>
                        Project Name
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        value={createProject.projectname}
                        name="projectname"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            projectname: e.target.value,
                          })
                        }
                      />   {error?.projectname && (
                        <span className="validationErrorMsg">{error?.projectname}</span>
                      )}

                      <p className={Styles.CreateProjectsInputCartText}>
                        Status
                      </p>

                      {/* <SelectStyled
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={createProject.status}
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            status: e.target.value,
                          })
                        }
                      >
                        <MenuItem value={10}>-None-</MenuItem>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Active Raising">
                          Active Raising
                        </MenuItem>
                        <MenuItem value="Active Investment">
                          Active Investment
                        </MenuItem>
                        <MenuItem value="Turned Down">Turned Down</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </SelectStyled> */}
                      <select  class="SearchSelectFilter"
                            value={createProject.status}
                            onChange={(e) =>
                              setCreateProject({
                                ...createProject,
                                status: e.target.value,
                              })
                            }>
                        <option value="None">-None-</option>
                        <option value="All">All</option>
                        <option value="Active Raising">Active Raising</option>
                        <option value="Active Investment">Active Investment</option>
                        <option value="Turned Down">Turned Down</option>
                        <option value="Completed">Completed</option>
                        <option value="Other">Other</option>
                        </select>
                        {error?.status && (
                        <span className="validationErrorMsg">{error?.status}</span>
                      )}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Start Date
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        type="date"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        name="startdate"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            startdate: e.target.value,
                          })
                        }
                      />
                      {error?.startdate && (
                        <span className="validationErrorMsg">{error?.startdate}</span>
                      )}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Upload OA & Subscription Documents as one file
                      </p>
                      <div className="file_input">
                        <InputStyled
                          id="outlined-basic"
                          type="file"
                          className=""
                          inputProps={{ maxLength: 50 }}
                          name="uploadeddocument"
                          onChange={(e) =>
                            setCreateProject({
                              ...createProject,
                              uploadeddocument: e.target.files[0],
                            })
                          }
                        />
                      </div>
                      {error?.uploadeddocument && (
                        <span className="validationErrorMsg">{error?.uploadeddocument}</span>
                      )}
                    </div>
                    <div className={Styles.CreateProjcetsInputCart}>
                      <p className={Styles.CreateProjectsInputCartText}>
                        Project summary
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 5000 }}
                        name="projectsummary"
                        multiline
                        rows={4}
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            projectsummary: e.target.value,
                          })
                        }
                      />
                        {error?.projectsummary && (
                        <span className="validationErrorMsg">{error?.projectsummary}</span>
                      )}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Deadline
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        type="date"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        name="deadline"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            deadline: e.target.value,
                          })
                        }
                      />
                       {error?.deadline && (
                        <span className="validationErrorMsg">{error?.deadline}</span>
                      )}
                    </div>
                  </div>

                  <div className={Styles.CreateProjetsTitleContainer}>
                    <p className={Styles.CreateProjetsTitle}>
                      Projects Details
                    </p>
                  </div>
                  <div className={Styles.CreateProjectsInputContent}>
                    <div className={Styles.CreateProjcetsInputCart}>
                      <p className={Styles.CreateProjectsInputCartText}>
                        Billed Name
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        name="billedname"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            billedname: e.target.value,
                          })
                        }
                      />
                       {error?.billedname && (
                        <span className="validationErrorMsg">{error?.billedname}</span>
                      )}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Total Allocation
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        name="totalallocation"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            totalallocation: e.target.value,
                          })
                        }
                      />
                      {error?.totalallocation && (
                        <span className="validationErrorMsg">{error?.totalallocation}</span>
                      )}
                      <p className={Styles.CreateProjectsInputCartText}>
                        House Ticket Link
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 100 }}
                        name="houseticketlink"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            houseticketlink: e.target.value,
                          })
                        }
                      />
                       {error?.houseticketlink && (
                        <span className="validationErrorMsg">{error?.houseticketlink}</span>
                      )}
                      <p className={Styles.CreateProjectsInputCartText}>
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
                          setCreateProject({
                            ...createProject,
                            generalcomments: e.target.value,
                          })
                        }
                      />
                          {error?.generalcomments && (
                        <span className="validationErrorMsg">{error?.generalcomments}</span>
                      )}
                    </div>
                    <div className={Styles.CreateProjcetsInputCart}>
                      <p className={Styles.CreateProjectsInputCartText}>
                        Total Capitalization
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        name="totalcapitalization"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            totalcapitalization: e.target.value,
                          })
                        }
                      />
                       {error?.totalcapitalization && (
                        <span className="validationErrorMsg">{error?.totalcapitalization}</span>
                      )}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Total Raised
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        name="totalraised"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            totalraised: e.target.value,
                          })
                        }
                      />
                       {error?.totalraised && (
                        <span className="validationErrorMsg">{error?.totalraised}</span>
                      )}
                      <p className={Styles.CreateProjectsInputCartText}>
                        House Ticket Comments
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50000 }}
                        name="houseticketcomments"
                        multiline
                        rows={4}
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
                            houseticketcomments: e.target.value,
                          })
                        }
                      />
                      {error?.houseticketcomments && (
                        <span className="validationErrorMsg">{error?.houseticketcomments}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles.CreateProjectsButtonContainer}>
                <button
                  className={Styles.CreateProjectsCancelButton}
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
                <button
                  className={Styles.CreateProjectsSubmitButton}
                  onClick={() => handleCreateProject()}
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
            <div className={Styles.ProjectsPageModelPopupContainer}>
              <div className={Styles.ProjectsPageModelPopupHeader}>
                <p className={Styles.ProjectsPageModelPopupHeaderText}>
                  Edit Projects
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleCloseEdit()}
                  className={Styles.ProjectsPageModelPopupHeaderTextIcon}
                />
              </div>
              <div className={Styles.ProjectsPageModelPopupbody}>
                <div className={Styles.CreateProjetsTitleContainer}>
                  <p className={Styles.CreateProjetsTitle}>
                    Projects Information
                  </p>
                </div>
                <div className={Styles.CreateProjectsInputContainer}>
                  <div className={Styles.CreateProjectsInputContent}>
                    <div className={Styles.CreateProjcetsInputCart}>
                      <p className={Styles.CreateProjectsInputCartText}>
                        Project Name
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        value={projectIdList.data?.projectname}
                        name="projectname"
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            projectname: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}

                      <p className={Styles.CreateProjectsInputCartText}>
                        Status
                      </p>

                      {/* <SelectStyled
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={projectIdList.data?.status}
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            status: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="">-None-</MenuItem>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Active Raising">
                          Active Raising
                        </MenuItem>
                        <MenuItem value="Active Investment">
                          Active Investment
                        </MenuItem>
                        <MenuItem value="Turned Down">Turned Down</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </SelectStyled> */}
                      <select  class="SearchSelectFilter"
                            value={projectIdList.data?.status}
                            onChange={(e) =>
                              setUpdateProject({
                                ...updateProject,
                                status: e.target.value,
                              })
                            }>
                        <option value="None">-None-</option>
                        <option value="All">All</option>
                        <option value="Active Raising">Active Raising</option>
                        <option value="Active Investment">Active Investment</option>
                        <option value="Turned Down">Turned Down</option>
                        <option value="Completed">Completed</option>
                        <option value="Other">Other</option>
                        </select>
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Start Date
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        type="date"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        value={projectIdList.data?.startdate}
                        name="startdate"
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            startdate: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Upload OA & Subscription Documents as one file
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        type="file"
                        className="file_input"
                        inputProps={{ maxLength: 50 }}
                        //  value={projectIdList.data?.uploadeddocument}
                        name="uploadeddocument"
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            uploadeddocument: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    </div>
                    <div className={Styles.CreateProjcetsInputCart}>
                      <p className={Styles.CreateProjectsInputCartText}>
                        Project summary
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50000 }}
                        value={projectIdList.data?.projectsummary}
                        name="projectsummary"
                        multiline
                        rows={4}
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            projectsummary: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Deadline
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        type="date"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        value={projectIdList.data?.deadline}
                        name="deadline"
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            deadline: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    </div>
                  </div>

                  <div className={Styles.CreateProjetsTitleContainer}>
                    <p className={Styles.CreateProjetsTitle}>
                      Projects Details
                    </p>
                  </div>
                  <div className={Styles.CreateProjectsInputContent}>
                    <div className={Styles.CreateProjcetsInputCart}>
                      <p className={Styles.CreateProjectsInputCartText}>
                        Billed Name
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        value={projectIdList.data?.billedname}
                        name="billedname"
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            billedname: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Total Allocation
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        value={projectIdList.data?.totalallocation}
                        name="totalallocation"
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            totalallocation: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                      <p className={Styles.CreateProjectsInputCartText}>
                        House Ticket Link
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        value={projectIdList.data?.houseticketlink}
                        name="houseticketlink"
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            houseticketlink: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                      <p className={Styles.CreateProjectsInputCartText}>
                        General Comments
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50000 }}
                        value={projectIdList.data?.generalcomments}
                        name="generalcomments"
                        multiline
                        rows={4}
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            generalcomments: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    </div>
                    <div className={Styles.CreateProjcetsInputCart}>
                      <p className={Styles.CreateProjectsInputCartText}>
                        Total Capitalization
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        value={projectIdList.data?.totalcapitalization}
                        name="totalcapitalization"
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            totalcapitalization: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                      <p className={Styles.CreateProjectsInputCartText}>
                        Total Raised
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50 }}
                        value={projectIdList.data?.totalraised}
                        name="totalraised"
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            totalraised: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                      <p className={Styles.CreateProjectsInputCartText}>
                        House Ticket Comments
                      </p>

                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 50000 }}
                        value={projectIdList.data?.houseticketcomments}
                        name="houseticketcomments"
                        multiline
                        rows={4}
                        onChange={(e) =>
                          setUpdateProject({
                            ...updateProject,
                            houseticketcomments: e.target.value,
                          })
                        }
                      />
                      {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles.CreateProjectsButtonContainer}>
                <button
                  className={Styles.CreateProjectsCancelButton}
                  onClick={() => handleCloseEdit()}
                >
                  Cancel
                </button>
                <button
                  className={Styles.CreateProjectsSubmitButton}
                  onClick={() => handleUpdateProject()}
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
                      <p className="ModelPopupHeaderText">Delete Project</p>
                      <CloseOutlinedIcon
                        onClick={() => handlesetDeleteConfimationModelClose()}
                        className="ModelPopupHeaderIcon"
                      />
                    </div>
                    <div className="ModelPopupbody">
                    <p className={Styles.ProjectsPageModelPopupContainerDeteleText}>
                      Do you really want to remove the Project : <span className={Styles.ProjectsPageModelPopupContainerDeteleTextProducerName}>{projectIdList.data?.projectname}</span> 
                      </p>
                    </div>
                    <div className="ModelPopupfooter">
                      <button
                        className={Styles.CreateProjectsCancelButton}
                        onClick={() => handlesetDeleteConfimationModelClose()}
                      >
                        No !
                      </button>
                      <button
                        className={Styles.CreateProjectsSubmitButton}
                        onClick={() => handleDeleteProjects()}
                      >
                        Yes !
                      </button>
                    </div>
                  </div>
                  
                </Box>
        </Modal>
      </div>
    </div>
  );
};
export default ProjectsPage;
