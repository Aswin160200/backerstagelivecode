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


  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));



  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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

  const handleCreateProject = async () => {
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

  console.log("ProjectList", allData);

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
              onClick={handleOpen}
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
              <SelectStyledFilter
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <MenuItem value="Status">Status</MenuItem>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active Raising">Active Raising</MenuItem>
                <MenuItem value="Active Investment">Active Investment</MenuItem>
                <MenuItem value="Turned Down">Turned Down</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </SelectStyledFilter>
            </FormControl>

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
                      />

                      <p className={Styles.CreateProjectsInputCartText}>
                        Status
                      </p>

                      <SelectStyled
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
                      </SelectStyled>
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
                        name="startdate"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
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
                        name="deadline"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
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
                        name="billedname"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
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
                        name="totalallocation"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
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
                        inputProps={{ maxLength: 100 }}
                        name="houseticketlink"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
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
                        name="totalcapitalization"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
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
                        name="totalraised"
                        onChange={(e) =>
                          setCreateProject({
                            ...createProject,
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
                        defaultValue={projectIdList.data?.projectname}
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

                      <SelectStyled
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
                      </SelectStyled>
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
                        defaultValue={projectIdList.data?.startdate}
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
                        defaultValue={projectIdList.data?.projectsummary}
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
                        defaultValue={projectIdList.data?.deadline}
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
                        defaultValue={projectIdList.data?.billedname}
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
                        defaultValue={projectIdList.data?.totalallocation}
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
                        defaultValue={projectIdList.data?.houseticketlink}
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
                        defaultValue={projectIdList.data?.generalcomments}
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
                        defaultValue={projectIdList.data?.totalcapitalization}
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
                        defaultValue={projectIdList.data?.totalraised}
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
                        defaultValue={projectIdList.data?.houseticketcomments}
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
      </div>
    </div>
  );
};
export default ProjectsPage;
