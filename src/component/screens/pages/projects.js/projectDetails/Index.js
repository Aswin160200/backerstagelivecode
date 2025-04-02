import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Styles from "./Index.module.css";
import { Box, Modal, Pagination, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import ProjectsImage from "../../../../assets/images/ProjectsImage.png";
import HeaderPage from "../../header/Header";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import { Link } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import "rc-pagination/assets/index.css";
import { useEffect } from "react";
import { useRef } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styled from "styled-components";
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import CoProducersTable from "./CoProducers.js/Index";
import DcoumentsPage from "./Documents/Index";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PartiesImage from "../../../../assets/images/PartiesImage.png";
import NotesImage from "../../../../assets/images/NotesImage.png";
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import {  createPartysProject, createProjects, getAllInvestors, getAllPartysProject, getCoProducerByProducerId, getInvestorById, getInvestorbyProducerId, getInvestorsByProjectId, getPartisProjectByID, getProjectByProducerId, getProjectsByID, updateProjects } from "../../../../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import DistributionsPage from "./Distributions/Index";
import ProjectCostPage from "./ProjectCost/Index";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,  
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  }

  const styleViewInvestorTable = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
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
const ProjectDetails = () => {

    let dispatch = useDispatch();
  const theme = useTheme();
  const { projectid } = useParams();

  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));



    const projectIdList = useSelector(
      (state) => state.projects.getProjectByIdSuccessfull
    );

    const investorsByProjectId = useSelector(
      (state) => state.investors.getInvestorsProducersIdSuccessfull
    );


      const createProjectdata = useSelector(
        (state) => state.projects.createProjectSuccessfull
      );

      const updateProjectsData = useSelector(
        (state) => state.projects.updateProjectByIdSuccessfull
      );

  const coProducers = useSelector(
        (state) => state.coProducers.getCoProducersByProducersId
      );


  const projectList = useSelector(
    (state) => state.projects.getProjectbyProducerId
  );

  const getCreatePartysProjectData = useSelector(
    (state) => state.projects.getAllPartysProjectListData
  );

  const getallInvestorsList = useSelector(
    (state) => state.investors.getAllInvestorSuccessfull
  );


  const getPartysProjectDataByID = useSelector(
    (state) => state.projects.getPartysProjectByIdSusscessfull
  );


  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [role, setRole] = useState("10");

const handleChangeRole = (event) => {
  setRole(event.target.value);
};


const [checkboxes, setCheckboxes] = useState({
  documentsReceived: false,
  fundsReceived: false,
});

const handleCheckboxChange = (e) => {
  setCheckboxes({
    ...checkboxes,
    [e.target.name]: e.target.checked,
  });
};

//create project
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   const [openEdit, setOpenEdit] = useState(false);
   const handleOpenEdit = () => setOpenEdit(true);
   const handleCloseEdit = () => setOpenEdit(false);


   const [partysProject, setPartysProject]=useState(false)
  //   add Party's Project start
  const [openPartysProject, setOpenPartysProject] = useState(false);
  const handleOpenPartysProject = () => setOpenPartysProject(true);
  const handleClosePartysProject = () => setOpenPartysProject(false);

   
//   add Party's Project end

//   Add Investor Docuents start
const [openInvestorDocument, setOpenInvestorDocument] = useState(false);
const handleOpenInvestorDocument = () => setOpenInvestorDocument(true);
const handleCloseInvestorDocument = () => setOpenInvestorDocument(false);
const handleCloseInvestorDocumentSubmit = () => {
    setOpenInvestorDocument(false);
    toast.success("Successfully upload Investor's Summary")
}

//   Add Investor Docuents end

//   Add New Distribution start
const [openNewDistribution, setOpenNewDistribution] = useState(false);
const handleOpenNewDistribution = () => setOpenNewDistribution(true);
const handleCloseNewDistribution = () => setOpenNewDistribution(false);
//   Add New Distribution end

//   Add New Project Cost start
const [openNewProjectCost, setOpenNewProjectCost] = useState(false);
const handleOpenNewProjectCost = () => setOpenNewProjectCost(true);
const handleCloseNewProjectCost = () => setOpenNewProjectCost(false);
//   Add New Distribution end

//   Generated Docs start
const [openGeneratedView, setOpenGeneratedView] = useState(false);
const handleOpenGeneratedView = () => setOpenGeneratedView(true);
const handleCloseGeneratedView = () => setOpenGeneratedView(false);
//   Generated Docs end


//   Investor View start
const [openInvestorView, setOpenInvestorView] = useState(false);
const handleOpenInvestorView = () => setOpenInvestorView(true);
const handleCloseInvestorView = () => setOpenInvestorView(false);
//   Investor Viww end

//   Investor Edit start
const [openInvestorEdit, setOpenInvestorEdit] = useState(false);
const handleOpenInvestorEdit = () => setOpenInvestorEdit(true);
const handleCloseInvestorEdit = () => setOpenInvestorEdit(false);
//   Investor Edit end

//   Notes start
const [openNotesDoc, setOpenNotesDoc] = useState(false);
const handleOpenNotesDoc = () => setOpenNotesDoc(true);
const handleCloseNotesDoc = () => setOpenNotesDoc(false);
//   Notes end

//   View Investor Docuents start
const [openViewInvestorDocument, setOpenViewInvestorDocument] = useState(false);
const handleOpenViewInvestorDocument = () => setOpenViewInvestorDocument(true);
const handleCloseViewInvestorDocument= () => setOpenViewInvestorDocument(false);


// partysProject Edit
const [openEditPartisProject, setOpenEditPartisProject] = useState(false);
const handleEditOpenPartisProject = (id) => {
  dispatch(getPartisProjectByID(id));
  setOpenEditPartisProject(true);
}
const handleEditClosePartisProject = () => setOpenEditPartisProject(false);

//View ParysPRoject
const [openViewPartisProject, setOpenViewPartisProject] = useState(false);
const handleViewOpenPartisProject = (id) => {
  dispatch(getPartisProjectByID(id));
  setOpenViewPartisProject(true);

}

const handleViewClosePartisProject = () => setOpenViewPartisProject(false);

 const [partiesAndNotesOpen ,setPartiesAndNotesOpen]=useState(false);
 const [notesOpen ,setnotesOpen]=useState(false);


const [investorID, setInvestorID]=useState()

 useEffect(() => {
  dispatch(getProjectsByID(projectid));

  if (updateProjectsData !== "" || updateProjectsData !== undefined || updateProjectsData !== null){
    dispatch(getProjectsByID(projectid));
  
 
  }else{
    toast.error("Something Error While update the Producer")
  }
}, [projectid,updateProjectsData]);

useEffect(() => {
   dispatch(getInvestorbyProducerId(storedUser.userid));
    dispatch(getCoProducerByProducerId(storedUser.userid));
      dispatch(getProjectByProducerId(storedUser.userid));
      dispatch(getAllPartysProject());
      dispatch(getAllInvestors());
}, [investorID]);

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
      projectname: projectIdList.data?.projectname,
      projectsummary: projectIdList.data?.projectsummary,
      status: projectIdList.data?.status,
      startdate: projectIdList.data?.startdate,
      deadline: projectIdList.data?.deadline,
      uploadeddocument: projectIdList.data?.uploadeddocument,
      billedname:projectIdList.data?.billedname,
      totalcapitalization: projectIdList.data?.totalcapitalization,
      totalallocation:projectIdList.data?.totalallocation,
      totalraised: projectIdList.data?.totalraised,
      houseticketlink:projectIdList.data?.houseticketlink,
      houseticketcomments: projectIdList.data?.houseticketcomments,
      generalcomments: projectIdList.data?.generalcomments,
    });
  

  const handleCreateProject = async () => {
 
    dispatch(createProjects(createProject));
              if (createProjectdata !== "" || createProjectdata !== undefined || createProjectdata !== null){
              
                toast.success("Producer updated successfully")
                setOpen(false);
              }else{
                toast.error("Something Error While update the Producer")
              }
  };

  const handleUpdateProject =()=>{
        dispatch(updateProjects({ id : projectid, data : updateProject }))
           
            setOpenEdit(false)
      }

    
//   View Investor Docuents end
  const [allData, setAllData] = useState([]);

  const [addPartysProject, setAddPartysProject] = useState(
    {  
      projectid:projectid,
      investorid: "",
      producersid: storedUser.userid,
      projectname: "",
      investingentityname: "",
      invesmentmethod: "",
      interestedamount: "",
      status: "",
      finalamount: "",
      documentreceived: "",
      investorcommands: "",
      fundsreceived: "",
      bonusandperks: "",
      co_producers: ""   
  })
 
  const [editPartysProject, setEditPartysProject] = useState(
  {
    projectname: "",
    investingentityname: "",
    invesmentmethod: "",
    interestedamount: "",
    status: "",
    finalamount: "",
    documentreceived: "",
    investorcommands: "",
    fundsreceived: "",
    bonusandperks: "",
    co_producers: "",
    updateddate: "",
  })

  
  const handleAddPartysProject = () => {
    dispatch(createPartysProject(addPartysProject))
    setOpenPartysProject(false);
  }

  const tableHead = {
    no: "No",
    investorname: "Investor Name",
    finalAmount: "Final Amount ",
    status: "Status",
    action: "Actions",
    docs:"Generated Docs",
    investorsDoc:"Investor's Docs",
    
  };
  const countPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  // useEffect(() => {
  //   if (getCreatePartysProjectData?.data) {
  //       const mappedData = getCreatePartysProjectData.data?.map((item, index) => ({
  //         no: index + 1,
  //         investorname: `${getallInvestorsList.data?.firstname}${getallInvestorsList.data?.lastname}`,
  //         finalAmount: item.finalamount,
  //         status:"active",
  //         action: (
  //                  <div className="TableActionContainer">
  //                  <EditOutlinedIcon className="TableActionEditIcon" />
  //                 <RemoveRedEyeOutlinedIcon
  //                    className="TableActionViewIcon"
  //                 />
  //                  <DeleteOutlineOutlinedIcon
  //                className="TableActionDeleteIcon"
  //                  />
  //                </div>
  //                ),
  //         investorsDoc:<div className={Styles.ProjectDetailsInvestorTableInvestorDocumentButtonContainer}><button className={Styles.ProjectDetailsInvestorTableInvestorDocumentViewButton} onClick={()=> handleOpenViewInvestorDocument()}>View</button><button className={Styles.ProjectDetailsInvestorTableInvestorDocumentUploadButton} onClick={()=> handleOpenInvestorDocument()}>Upload</button></div>,
  //         docs:<button className={Styles.ProjectDetailsInvestorTableInvestorDocumentGenerateButton} onClick={()=> handleOpenGeneratedView()}>View</button>,
  //     }));
  //       setAllData(mappedData);
  //       setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
  //     }
  //   }, [getCreatePartysProjectData,getallInvestorsList]);

  useEffect(() => {
    if (getCreatePartysProjectData?.data && getallInvestorsList?.data) {
      const mappedData = getCreatePartysProjectData.data?.map((item, index) => {

        const matchedInvestor = getallInvestorsList.data?.find(
          (investor) => String(investor.investorid) === String(item.investorid)
        );
  
        return {
          no: index + 1,
          investorname: matchedInvestor
            ? `${matchedInvestor.firstname} ${matchedInvestor.lastname}`
            : "N/A", 
          finalAmount: item.finalamount,
          status: "active",
          action: (
            <div className="TableActionContainer">
              <EditOutlinedIcon className="TableActionEditIcon" onClick={()=> handleEditOpenPartisProject(item.partysprojectid)}/>
              <RemoveRedEyeOutlinedIcon className="TableActionViewIcon" onClick={()=> handleViewOpenPartisProject(item.partysprojectid)}/>
              <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" />
            </div>
          ),
          investorsDoc: (
            <div className={Styles.ProjectDetailsInvestorTableInvestorDocumentButtonContainer}>
              <button
                className={Styles.ProjectDetailsInvestorTableInvestorDocumentViewButton}
                onClick={() => handleOpenViewInvestorDocument()}
              >
                View
              </button>
              <button
                className={Styles.ProjectDetailsInvestorTableInvestorDocumentUploadButton}
                onClick={() => handleOpenInvestorDocument()}
              >
                Upload
              </button>
            </div>
          ),
          docs: (
            <button
              className={Styles.ProjectDetailsInvestorTableInvestorDocumentGenerateButton}
              onClick={() => handleOpenGeneratedView()}
            >
              View
            </button>
          ),
        };
      });
  
      setAllData(mappedData);
      setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
    }
  }, [getCreatePartysProjectData, getallInvestorsList]);
  

    useEffect(() => {
      if (getCreatePartysProjectData?.data) {
       getCreatePartysProjectData.data?.map((item, index) => (
          setInvestorID(item.investorid)
        ));
   
      }
    }, [getCreatePartysProjectData]);


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

  //   table data end
//   View investor Upload Document table data Start

  const allDataViewInvestorUpdatedDocument = [
    {
        fileName: <p><InsertPageBreakOutlinedIcon/>  {projectIdList.data?.uploadeddocument}</p>,
        investorname: "",
      projectName:  projectIdList.data?.projectname,
      updatedOn: projectIdList.data?.startdate,
      action: (
        <div className="TableActionContainer">
        
        <SaveAltOutlinedIcon
          className="TableActionViewIcon"
        />
        <DeleteOutlineOutlinedIcon
          className="TableActionDeleteIcon"
        />
      </div>
      ),
       },
   
   
  ];

  const tableHeadViewInvestorUpdatedDocument = {
    fileName: "File Name",
    investorname: "Investor Name",
    projectName: "Project Name",
    updatedOn: "Updated On",
    action: "Actions",
  };
 

  const countPerPageViewInvestorUpdatedDocument = 5;
  const [currentPageViewInvestorUpdatedDocument, setCurrentPageViewInvestorUpdatedDocument] = useState(1);
  const [collectionViewInvestorUpdatedDocument, setCollectionViewInvestorUpdatedDocument] = useState(
    cloneDeep(allDataViewInvestorUpdatedDocument.slice(0, countPerPageViewInvestorUpdatedDocument))
  );

  const tableRowsViewInvestorUpdatedDocument = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHeadViewInvestorUpdatedDocument);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableDataViewInvestorUpdatedDocument = () => {
    return collectionViewInvestorUpdatedDocument.map((key, index) => tableRowsViewInvestorUpdatedDocument({ key, index }));
  };

  const headRowViewInvestorUpdatedDocument = () => {
    return Object.values(tableHeadViewInvestorUpdatedDocument).map((title, index) => (
      <th key={index}>{title}</th>
    ));
  };

  //   View investor Upload Document table data  end

  const HandleCahngePatiesAndNotes=()=>{
        if(partiesAndNotesOpen === false){
            setPartiesAndNotesOpen(true)
        }
        else{
            setPartiesAndNotesOpen(false)
        }
  }

  const HandleCahngeNotes=()=>{
    if(notesOpen === false){
        setnotesOpen(true)
    }
    else{
        setnotesOpen(false)
    }
}

  return (
    <div className={Styles.ProjectDetailsMainContainer}>
      <HeaderPage />
      <div className={Styles.ProjectsDetailsNavContainer}>
        <div className={Styles.ProjectsDetailsNavContainerLeftSide}>
          <img
            src={ProjectsImage}
            alt=""
            className={Styles.ProjectsDetailsPagenavCartImg}
          />
          <p className={Styles.ProjectsDetailsPagenavCartText}>Projects</p>
        </div>

        <Link to="/projects" className="Link">
            <Tooltip title="Back to List" arrow>
                <KeyboardReturnIcon className={Styles.ProjectDetailsPageNavCalenderIcon} />
            </Tooltip>
        </Link>

        
      </div>
      <div className={Styles.ProjectDetailsNavCartContainer}>
        <div className={Styles.ProjectDetailsNavCartHeaderContent}>
          <p className={Styles.ProjectDetailsNavCartHeaderContentText}>
          {projectIdList.data?.projectname}
          </p>
          <button className={Styles.ProjectDetailsNavCartHeaderContentButton} onClick={()=> handleOpen()}>
            Add Projects
          </button>
        </div>
        <div className={Styles.ProjectDetailsNavCartDetails}>
          <div className={Styles.ProjectDetailsNavCartDetailsCard}>
            <p className={Styles.ProjectDetailsNavCartDetailsCardText}>
              Start date
            </p>
            <p className={Styles.ProjectDetailsNavCartDetailsCardTextdata}>
            {projectIdList.data?.startdate}
            </p>
          </div>
          <div className={Styles.ProjectDetailsNavCartDetailsCard}>
            <p className={Styles.ProjectDetailsNavCartDetailsCardText}>
              Status
            </p>
            <p className={Styles.ProjectDetailsNavCartDetailsCardTextdata}>
            {projectIdList.data?.status}
            </p>
          </div>
          <div className={Styles.ProjectDetailsNavCartDetailsCard}>
            <p className={Styles.ProjectDetailsNavCartDetailsCardText}>
              Total Invested
            </p>
            <p className={Styles.ProjectDetailsNavCartDetailsCardTextdata}>
            {projectIdList.data?.totalallocation}
            </p>
          </div>
        </div>
      </div>
      <div className={Styles.ProjectDetailsTabAndNotesContainer}>
        <div className={Styles.ProjectDetailsPageTabsContainer}>
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
                />
                <Tab
                  label={<p className={Styles.TabAddIconTExt}>Investors</p>}
                  {...a11yProps(1)}
                />
                <Tab
                  label={<p className={Styles.TabAddIconTExt}>Co-Producers</p>}
                  {...a11yProps(1)}
                />
                <Tab
                  label={<p className={Styles.TabAddIconTExt}>Documents</p>}
                  {...a11yProps(1)}
                />
                <Tab
                  label={<p className={Styles.TabAddIconTExt}>Distributions</p>}
                  {...a11yProps(1)}
                />
                <Tab
                  label={<p className={Styles.TabAddIconTExt}>Project Costs</p>}
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className={Styles.ProjectDetailsTabDetailsContainer}>
                <div className={Styles.ProjectDetailsTabDetailsHeader}>
                  <p className={Styles.ProjectDetailsTabDetailsHeaderText}>
                    Project Information
                  </p>
                  <EditOutlinedIcon
                    className={Styles.ProjectDetailsTabDetailsHeaderEditIcon}
                    onClick={()=> handleOpenEdit()}
                  />
                </div>
                <div className={Styles.ProjectDetailsInformationContianer}>
                  <div className={Styles.ProjectDetailsInformationContent}>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        Project Name
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                        {projectIdList.data?.projectname}
                      </p>
                    </div>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        Status
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                        {projectIdList.data?.status}
                      </p>
                    </div>
                  </div>
                  <div className={Styles.ProjectDetailsInformationContent}>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        Start Date
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                         {projectIdList.data?.startdate}
                      </p>
                    </div>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        Deadline
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                          {projectIdList.data?.deadline}
                      </p>
                    </div>
                  </div>
                  <div className={Styles.ProjectDetailsInformationContent}>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        Project Summary
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                          {projectIdList.data?.projectsummary}
                      </p>
                    </div>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        OA & Subscription Documents
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                        <InsertPageBreakOutlinedIcon
                          className={
                            Styles.ProjectDetailsPageInformationDocumentICon
                          }
                        />  {projectIdList.data?.uploadeddocument}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={Styles.ProjectDetailsTabDetailsHeader}>
                  <p className={Styles.ProjectDetailsTabDetailsHeaderText}>
                    Project Details
                  </p>
                </div>
                <div className={Styles.ProjectDetailsInformationContianer}>
                  <div className={Styles.ProjectDetailsInformationContent}>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        Billed Name
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                         {projectIdList.data?.billedname}
                      </p>
                    </div>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        Total Capitalization
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                          {projectIdList.data?.totalcapitalization}
                      </p>
                    </div>
                  </div>
                  <div className={Styles.ProjectDetailsInformationContent}>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        Total Allocation
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                        {projectIdList.data?.totalallocation}
                      </p>
                    </div>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        Total Raised
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                         {projectIdList.data?.totalraised}
                      </p>
                    </div>
                  </div>
                  <div className={Styles.ProjectDetailsInformationContent}>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        House Ticket Link
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                         {projectIdList.data?.houseticketlink}
                      </p>
                    </div>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        House Ticket Comments
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                          {projectIdList.data?.houseticketcomments}
                      </p>
                    </div>
                  </div>
                  <div className={Styles.ProjectDetailsInformationContent}>
                    <div
                      className={Styles.ProjectDetailsInformationDetailsCard}
                    >
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardText
                        }
                      >
                        General Comments
                      </p>
                      <p
                        className={
                          Styles.ProjectDetailsInformationDetailsCardTextdata
                        }
                      >
                          {projectIdList.data?.generalcomments}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div>
                <div className={Styles.ProjectDetailsPageInvestorTableHeaderButtonContainer}>
                        <button className={Styles.ProjectDetailsPageInvestorTableHeaderButton} onClick={()=> handleOpenPartysProject()}>Add New</button>
                </div>
                {getCreatePartysProjectData === "" ? <p className={Styles.ProjectDetailsNodataAvailableText}>---No Data Aailable---</p>:
                <div className={Styles.ProjectsDetailsPageInvestorTabsContainerTable}>
                  <table>
                    <thead>
                      <tr>{headRow()}</tr>
                    </thead>
                    <tbody className="trhover">{tableData()}</tbody>
                  </table>
                  <div className={Styles.ProjectDetailsPageInvesotrTablePagination}>
                    <Pagination
                      pageSize={countPerPage}
                      onChange={updatePage}
                      current={currentPage}
                      total={allData.length}
                    />
                  </div>
                </div>
                }
              </div>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <CoProducersTable/>
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
                <DcoumentsPage/>
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>

            <div className="PageHeader">
            <p className="PageTableTitleText">Distributions</p>
            <button className="PageTableNavContentButton" onClick={()=> handleOpenNewDistribution()}>Add New</button>
            </div>
                <DistributionsPage/>
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
            <div className="PageHeader">
            <p className="PageTableTitleText">Project Cost</p>
            <button className="PageTableNavContentButton" onClick={()=> handleOpenNewProjectCost()}>Add New</button>
            </div>
            <ProjectCostPage/>
            </TabPanel>
          </Box>
        </div>
        <div className={Styles.ProjectDetailsPartiesAndNotesContainer}>
                <div className={Styles.ProjectDetailsPartiesAndNotesContentMainContainer}> 
                    <div className={Styles.ProjectDetailsPartiesAndNotesContent}>
                    <div className={Styles.ProjectDetailsPartiesAndNotesContentHeader}>
                        <img src={PartiesImage} alt="PartiesImage"/>
                        <p className={Styles.ProjectDetailsPartiesAndNotesContentHeaderText}>Parties</p>
                    </div>
                    <ExpandMoreOutlinedIcon className={Styles.ProjectDetailsPAtiesAndNotesIcon} onClick={()=> HandleCahngePatiesAndNotes()}/>
                    </div>
                    {partiesAndNotesOpen === true ? <div className={Styles.ProjectDetailsPartiesContainer}>
                            <p className={Styles.ProjectDetailsPartiesContainerText}>Mathew   <span onClick={()=> handleOpenPartysProject()}><  AddBoxIcon /></span> </p>
                          
                            <div className={Styles.ProjectDetailsPartiesContent}>
                                <p className={Styles.ProjectDetailsPartiesContentTitle}>Status</p>
                                <p className={Styles.ProjectDetailsPartiesContentText}>Investing In Deal</p>
                            </div>
                            <div className={Styles.ProjectDetailsPartiesContent}>
                                <p className={Styles.ProjectDetailsPartiesContentTitle}>Interested Amount</p>
                                <p className={Styles.ProjectDetailsPartiesContentText}>General</p>
                            </div>
                            <div className={Styles.ProjectDetailsPartiesContent}>
                                <p className={Styles.ProjectDetailsPartiesContentTitle}>Final Amount</p>
                                <p className={Styles.ProjectDetailsPartiesContentText}>$50,974</p>
                            </div>
                    </div>:""}
                </div>
                <div className={Styles.ProjectDetailsPartiesAndNotesContentMainContainer}> 
                <div className={Styles.ProjectDetailsPartiesAndNotesContent}> 
                    <div className={Styles.ProjectDetailsPartiesAndNotesContentHeader}>
                        <img src={NotesImage} alt="NotesImage"/>
                        <p className={Styles.ProjectDetailsPartiesAndNotesContentHeaderText}>Notes </p>
                    </div>
                    <ExpandMoreOutlinedIcon  className={Styles.ProjectDetailsPAtiesAndNotesIcon} onClick={()=> HandleCahngeNotes()}/>
                </div>
                {notesOpen === true ? <div className={Styles.ProjectDetailsPartiesContainer}>
                            <p className={Styles.ProjectDetailsPartiesContainerText}>Call With Robin <span onClick={()=> handleOpenNotesDoc()}><  AddBoxIcon /></span></p>
                            <div className={Styles.ProjectDetailsPartiesContent}>
                                <p className={Styles.ProjectDetailsPartiesContentTitle}>Note </p>
                                <p className={Styles.ProjectDetailsPartiesContentText}>Spoke with Robin</p>
                            </div>
                    </div>:""}
                </div>
        </div>
      </div>


      <Modal
          open={openPartysProject}
          onClose={handleClosePartysProject}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box class="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
              <div className="ModelPopupHeader">
                <p className="ModelPopupHeaderText">
                  New Party's Projects
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleClosePartysProject()}
                  className="ModelPopupHeaderIcon"
                />
              </div>
              <div className="ModelPopupbody">
              <div className={Styles.CreateProjetsdetailsAddPartysProjectTitleContainer}>
                <p className={Styles.CreateProjetsdetailsAddPartysProjectTitle}>
                  Information
                </p>
              </div>
              <div className={Styles.CreateProjetsdetailsAddPartysInputContainer}>
                <div className={Styles.CreateProjetsdetailsAddPartysInputContent}>
                  <div className={Styles.CreateProjetsdetailsAddPartysInputCart}>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investor
                    </p>
                      <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addPartysProject.investorid}
                    onChange={(e)=> setAddPartysProject({...addPartysProject, investorid:e.target.value})}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                      },
                    }}
                  >
                     <MenuItem value="-None-">-None-</MenuItem>
                     {Array.isArray(investorsByProjectId?.data) && investorsByProjectId?.data.length > 0 ? (
                        investorsByProjectId?.data.map((investor) => (
                          <MenuItem key={investor.investorid} value={investor.investorid}>
                            {investor.firstname} {investor.lastname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Investors Available</MenuItem>
                      )}
                  </SelectStyled>
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
            <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investing Entity Name
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50000 }}
                      name="lastname"
                      multiline
                      onChange={(e)=> setAddPartysProject({...addPartysProject, investingentityname:e.target.value})}
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                     <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Status
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addPartysProject.status}
                    onChange={(e)=> setAddPartysProject({...addPartysProject, status:e.target.value})}
                  >
                     <MenuItem value="-None-">-None-</MenuItem>
                    <MenuItem value="Interested">Interested</MenuItem>
                    <MenuItem value="Investing In Project">Investing In Project</MenuItem>
                    <MenuItem value="Passing On Project">Passing On Project</MenuItem>
                  </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                     Documents Received
                    </p>

                    <div className="checkInput">
                    <input
                    type="checkbox"
                    name="documentsReceived"
                    checked={checkboxes.documentreceived}
                    onChange={(e)=> setAddPartysProject({...addPartysProject, documentreceived:e.target.value})}
                    className={Styles.CheckboxInput} // Add CSS for size
                   />
                   </div>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Funds Received
                    </p>
                    <div className="checkInput">
                    <input
                    type="checkbox"
                    name="documentsReceived"
                    checked={checkboxes.fundsreceived}
                    onChange={(e)=> setAddPartysProject({...addPartysProject, fundsreceived:e.target.value})}
                    className={Styles.CheckboxInput} // Add CSS for size
                   />
                   </div>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investment Round
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50000 }}
                      name="lastname"
                      onChange={(e)=> setAddPartysProject({...addPartysProject, investingentityname:e.target.value})}
                      multiline
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.CreateProjetsdetailsAddPartysInputCart}>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Project
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addPartysProject.investoridprojectid}
                    onChange={(e)=> setAddPartysProject({...addPartysProject, projectid:e.target.value})}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                      },
                    }}
                  >
                     <MenuItem value="-None-">-None-</MenuItem>
                     {Array.isArray(projectList?.data) && projectList?.data.length > 0 ? (
                        projectList?.data.map((project) => (
                          <MenuItem key={project.projectid} value={project.projectid}>
                            {project.projectname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Projects Available</MenuItem>
                      )}
                  </SelectStyled>
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
            <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investment Method
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addPartysProject.invesmentmethod}
                    onChange={(e)=> setAddPartysProject({...addPartysProject, invesmentmethod:e.target.value})}
                  >
                    <MenuItem value="-None-">-None-</MenuItem>
                    <MenuItem value="SPV">SPV</MenuItem>
                    <MenuItem value="Direct to Production">Direct to Production</MenuItem>
                  </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Interested Amount
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="lastname"
                      onChange={(e)=> setAddPartysProject({...addPartysProject, interestedamount:e.target.value})}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                     <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Final Amount
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="firstname"
                      onChange={(e)=> setAddPartysProject({...addPartysProject, finalamount:e.target.value})}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                     <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investor Comments
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50000 }}
                      name="lastname"
                      multiline
                      onChange={(e)=> setAddPartysProject({...addPartysProject, investorcommands:e.target.value})}
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Bonus/Perks
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      name="lastname"
                      onChange={(e)=> setAddPartysProject({...addPartysProject, bonusandperks:e.target.value})}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Co-Producer
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={"None"}
                    onChange={(e)=> setAddPartysProject({...addPartysProject, co_producers:e.target.value})}
                  >
                     <MenuItem value="None">-None-</MenuItem>
                     {Array.isArray(coProducers?.data) && coProducers?.data.length > 0 ? (
                        coProducers?.data.map((coProducer) => (
                          <MenuItem key={coProducer.co_producersid} value={coProducer.co_producersid}>
                            {coProducer.firstname} {coProducer.lastname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Co-Producers Available</MenuItem>
                      )}
                  </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                
              
              </div>
              </div>
              <div className="ModelPopupfooter">
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton} onClick={()=>handleClosePartysProject()}>
                Cancel
              </button>
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton} onClick={()=>handleAddPartysProject()}>
                Save
              </button>
            </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={openEditPartisProject}
          onClose={handleEditOpenPartisProject}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box class="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
              <div className="ModelPopupHeader">
                <p className="ModelPopupHeaderText">
                  Edit Party's Projects
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleEditClosePartisProject()}
                  className="ModelPopupHeaderIcon"
                />
              </div>
              <div className="ModelPopupbody">
              <div className={Styles.CreateProjetsdetailsAddPartysProjectTitleContainer}>
                <p className={Styles.CreateProjetsdetailsAddPartysProjectTitle}>
                  Information
                </p>
              </div>
              <div className={Styles.CreateProjetsdetailsAddPartysInputContainer}>
                <div className={Styles.CreateProjetsdetailsAddPartysInputContent}>
                  <div className={Styles.CreateProjetsdetailsAddPartysInputCart}>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investor
                    </p>
                      <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getPartysProjectDataByID.investorid}
                    readOnly
                    // onChange={(e)=> setAddPartysProject({...addPartysProject, investorid:e.target.value})}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                      },
                    }}
                  >
                     <MenuItem value="-None-">-None-</MenuItem>
                     {Array.isArray(investorsByProjectId?.data) && investorsByProjectId?.data.length > 0 ? (
                        investorsByProjectId?.data.map((investor) => (
                          <MenuItem key={investor.investorid} value={investor.investorid}>
                            {investor.firstname} {investor.lastname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Investors Available</MenuItem>
                      )}
                  </SelectStyled>
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
            <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investing Entity Name
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50000 }}
                      value={getPartysProjectDataByID.data?.investingentityname}
                      name="lastname"
                      multiline
                      onChange={(e)=> setEditPartysProject({...editPartysProject, investingentityname:e.target.value})}
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                     <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Status
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getPartysProjectDataByID.data?.status}
                    onChange={(e)=> setEditPartysProject({...editPartysProject, status:e.target.value})}

                  >
                     <MenuItem value="-None-">-None-</MenuItem>
                    <MenuItem value="Interested">Interested</MenuItem>
                    <MenuItem value="Investing In Project">Investing In Project</MenuItem>
                    <MenuItem value="Passing On Project">Passing On Project</MenuItem>
                  </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                     Documents Received
                    </p>

                    <div className="checkInput">
                    <input
                    type="checkbox"
                    name="documentsReceived"
                    checked= {getPartysProjectDataByID.data?.documentreceived}
                    onChange={(e)=> setEditPartysProject({...editPartysProject, documentreceived:e.target.value})}
                    className={Styles.CheckboxInput} // Add CSS for size
                   />
                   </div>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Funds Received
                    </p>
                    <div className="checkInput">
                    <input
                    type="checkbox"
                    name="documentsReceived"
                    checked= {getPartysProjectDataByID.data?.fundsreceived}
                    onChange={(e)=> setEditPartysProject({...editPartysProject, fundsreceived:e.target.value})}
                    className={Styles.CheckboxInput} // Add CSS for size
                   />
                   </div>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investment Round
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50000 }}
                      defaultValue= {getPartysProjectDataByID.data?.investorcommands}
                      name="lastname"
                      onChange={(e)=> setEditPartysProject({...editPartysProject, investorcommands:e.target.value})}
                      multiline
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.CreateProjetsdetailsAddPartysInputCart}>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Project
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value= {getPartysProjectDataByID.data?.projectname}
                    readOnly
                    // onChange={(e)=> setAddPartysProject({...addPartysProject, projectid:e.target.value})}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                      },
                    }}
                  >
                     <MenuItem value="-None-">-None-</MenuItem>
                     {Array.isArray(projectList?.data) && projectList?.data.length > 0 ? (
                        projectList?.data.map((project) => (
                          <MenuItem key={project.projectid} value={project.projectid}>
                            {project.projectname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Projects Available</MenuItem>
                      )}
                  </SelectStyled>
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
            <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investment Method
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                   
                    value= {getPartysProjectDataByID.data?.invesmentmethod}
                    onChange={(e)=> setEditPartysProject({...editPartysProject, invesmentmethod:e.target.value})}
                  >
                    <MenuItem value="-None-">-None-</MenuItem>
                    <MenuItem value="SPV">SPV</MenuItem>
                    <MenuItem value="Direct to Production">Direct to Production</MenuItem>
                  </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Interested Amount
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      defaultValue= {getPartysProjectDataByID.data?.interestedamount}
                      name="lastname"
                      onChange={(e)=> setEditPartysProject({...editPartysProject, interestedamount:e.target.value})}

                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                     <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Final Amount
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      defaultValue= {getPartysProjectDataByID.data?.finalamount}
                      name="firstname"
                      onChange={(e)=> setEditPartysProject({...editPartysProject, finalamount:e.target.value})}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                     <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investor Comments
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50000 }}
                      defaultValue= {getPartysProjectDataByID.data?.investorcommands}
                      name="lastname"
                      multiline
                      onChange={(e)=> setEditPartysProject({...editPartysProject, investorcommands:e.target.value})}
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Bonus/Perks
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      defaultValue= {getPartysProjectDataByID.data?.bonusandperks}
                      name="lastname"
                      onChange={(e)=> setEditPartysProject({...editPartysProject, bonusandperks:e.target.value})}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Co-Producer
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value= {getPartysProjectDataByID.data?.co_producers}
                    onChange={(e)=> setEditPartysProject({...editPartysProject, co_producers:e.target.value})}
                  >
                     <MenuItem value="None">-None-</MenuItem>
                     {Array.isArray(coProducers?.data) && coProducers?.data.length > 0 ? (
                        coProducers?.data.map((coProducer) => (
                          <MenuItem key={coProducer.co_producersid} value={coProducer.co_producersid}>
                            {coProducer.firstname} {coProducer.lastname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Co-Producers Available</MenuItem>
                      )}
                  </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                
              
              </div>
              </div>
              <div className="ModelPopupfooter">
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton} onClick={()=>handleEditClosePartisProject()}>
                Cancel
              </button>
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton} onClick={()=>handleEditClosePartisProject()}>
                Save
              </button>
            </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={openViewPartisProject}
          onClose={handleViewClosePartisProject}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box class="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
              <div className="ModelPopupHeader">
                <p className="ModelPopupHeaderText">
                  View Party's Projects
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleViewClosePartisProject()}
                  className="ModelPopupHeaderIcon"
                />
              </div>
              <div className="ModelPopupbody">
              <div className={Styles.CreateProjetsdetailsAddPartysProjectTitleContainer}>
                <p className={Styles.CreateProjetsdetailsAddPartysProjectTitle}>
                  Information
                </p>
              </div>
              <div className={Styles.CreateProjetsdetailsAddPartysInputContainer}>
                <div className={Styles.CreateProjetsdetailsAddPartysInputContent}>
                  <div className={Styles.CreateProjetsdetailsAddPartysInputCart}>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investor
                    </p>
                    <p className="InputCartTextData">
                      {getPartysProjectDataByID?.data?.firstname} {getPartysProjectDataByID?.data?.lastname}
                    </p>
                    
                 
            <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investing Entity Name
                    </p>
                    <p className="InputCartTextData">
                      {getPartysProjectDataByID.data?.investingentityname}
                    </p>
                   
                     <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Status
                    </p>
                    <p className="InputCartTextData">
                      {getPartysProjectDataByID.data?.status}
                    </p>
                   
                   
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                     Documents Received
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.documentreceived}
                    </p>
                   
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Funds Received
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.fundsreceived}
                    </p>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investment Round
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.investorcommands}
                    </p>
                  
                  </div>
                  <div className={Styles.CreateProjetsdetailsAddPartysInputCart}>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Project
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.projectname}
                    </p>
                   
            <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investment Method
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.invesmentmethod}
                    </p>
                   
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Interested Amount
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.interestedamount}
                    </p>
                   
                     <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Final Amount
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.finalamount}
                    </p>
                   
                   
                     <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Investor Comments
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.investorcommands}
                    </p>
                   
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Bonus/Perks
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.bonusandperks}
                    </p>
                  
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                    Co-Producer
                    </p>
                    <p className="InputCartTextData">
                    {getPartysProjectDataByID.data?.co_producers}
                    </p>
                  
                  </div>
                </div>
                
              
              </div>
              </div>
              <div className="ModelPopupfooter">
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton} onClick={()=>handleViewClosePartisProject()}>
                Cancel
              </button>
            </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={openInvestorDocument}
          onClose={handleCloseInvestorDocument}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
              <div className="ModelPopupHeader">
                <p className="ModelPopupHeaderText">
                 Upload Investor's Documents
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleCloseInvestorDocument()}
                  className="ModelPopupHeaderIcon"
                />
              </div>
              <div className="ModelPopupbody">
              <div className={Styles.CreateProjetsdetailsAddPartysProjectTitleContainer}>
                <p className={Styles.CreateProjetsdetailsAddPartysProjectTitle}>
                  Upload Summary
                </p>
                <p className={Styles.CreateProjetsdetailsAddPartysProjectText}>
                  You are going To Upload The File Named "{projectIdList.data?.uploadeddocument}"
                </p>
              </div>
              <div className={Styles.CreateProjetsdetailsAddPartysInputContainer}>
                <div className={Styles.CreateProjetsdetailsAddPartysInputContent}>
                  <div className={Styles.CreateProjetsdetailsAddPartysInputCart}>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      File Name
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                  <div className={Styles.CreateProjetsdetailsAddPartysInputCart}>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Description
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="lastname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                </div>
                <div className={Styles.CreateProjetsdetailsAddPartysInputContent}>
                  <div className={Styles.CreateProjetsdetailsAddPartysInputCart}>
                    <p className={Styles.CreateProjetsdetailsAddPartysInputCartText}>
                      Updated On   
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      type="date"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
                        <span className={Styles.registerErrormsg}>{error?.username}</span>
                        )} */}
                  </div>
                </div>
               
              </div>
              </div>
              <div className="ModelPopupfooter">
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton} onClick={()=>handleCloseInvestorDocument()}>
                Cancel
              </button>
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton} onClick={()=>handleCloseInvestorDocumentSubmit()}>
                Upload
              </button>
            </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={openViewInvestorDocument}
          onClose={handleCloseViewInvestorDocument}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
              <div className="ModelPopupHeader">
                <p className="ModelPopupHeaderText">
                 View Investor's Documents
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleCloseViewInvestorDocument()}
                  className="ModelPopupHeaderIcon"
                />
              </div>           
              <div className="ModelPopupbody">
              <div className={Styles.ProjectsDetailsPageInvestorTabsContainerTable}>
                  <table>
                    <thead>
                      <tr>{headRowViewInvestorUpdatedDocument()}</tr>
                    </thead>
                    <tbody className="trhover">{tableDataViewInvestorUpdatedDocument()}</tbody>
                  </table>
                </div>
                </div>
              <div className="ModelPopupfooter">
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton} onClick={()=>handleCloseViewInvestorDocument()}>
                Cancel
              </button>
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton} onClick={()=>handleCloseViewInvestorDocument()}>
                Upload
              </button>
            </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={openNewDistribution}
          onClose={handleCloseNewDistribution}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
              <div className="ModelPopupHeader">
                <p className="ModelPopupHeaderText">
                New Distribution
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleCloseNewDistribution()}
                  className="ModelPopupHeaderIcon"
                />
              </div>           
              <div className="ModelPopupbody">
              <div className={Styles.CreateProjetsdetailsAddPartysProjectTitleContainer}>
                <p className={Styles.CreateProjetsdetailsAddPartysProjectTitle}>
                  Information
                </p>                
              </div>
              <div className="InputContainer">
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">
                    Distribution Name/Number
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
             <p className="InputCartText">
                    Date of Distribution
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    <p className="InputCartText">
                    Total Recouped to Date
                    </p>

                    <InputStyled
                      id="outlined-basic"
                       type="text"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
            
                  </div>
                  <div className="InputCart">
                  <p className="InputCartText">
                    Project
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // onChange={(e)=> setAddPartysProject({...addPartysProject, projectid:e.target.value})}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                      },
                    }}
                  >
                     <MenuItem value="-None-">-None-</MenuItem>
                     {Array.isArray(projectList?.data) && projectList?.data.length > 0 ? (
                        projectList?.data.map((project) => (
                          <MenuItem key={project.projectid} value={project.projectid}>
                            {project.projectname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Projects Available</MenuItem>
                      )}
                  </SelectStyled>
                    <p className="InputCartText">
                    Amount of Destribution
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      type="text"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />             
                  </div>
                </div>
               
               
              </div>
                </div>
              <div className="ModelPopupfooter">
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton} onClick={()=>handleCloseNewDistribution()}>
                Cancel
              </button>
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton} onClick={()=>handleCloseNewDistribution()}>
                Save
              </button>
            </div>
            </div>
          </Box>
        </Modal> 

         <Modal
          open={openNewProjectCost}
          onClose={handleCloseNewProjectCost}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
              <div className="ModelPopupHeader">
                <p className="ModelPopupHeaderText">
                New Project Cost
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleCloseNewProjectCost()}
                  className="ModelPopupHeaderIcon"
                />
              </div>           
              <div className="ModelPopupbody">
              <div className={Styles.CreateProjetsdetailsAddPartysProjectTitleContainer}>
                <p className={Styles.CreateProjetsdetailsAddPartysProjectTitle}>
                  Details
                </p>                
              </div>
              <div className="InputContainer">
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">
                    Cost Destribution
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 200 }}
                      name="firstname"
                      multiline
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
             
                  </div>
                  <div className="InputCart">
                  <p className="InputCartText">
                   Total Cost
                    </p>

                    <InputStyled
                      id="outlined-basic"
                       type="text"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />    
                    <p className="InputCartText">
                    Date of Cast
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />             
                  </div>
                </div>
                <div className={Styles.CreateProjetsdetailsAddPartysProjectTitleContainer}>
                <p className={Styles.CreateProjetsdetailsAddPartysProjectTitle}>
                  Additional Info
                </p>                
              </div>
              <div className="InputContent">
                <div className="InputCart">
                  <p className="InputCartText">
                    Status
                    </p>   
                  <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={handleChangeRole}
                  >
                   <MenuItem value="None">-None-</MenuItem>
                    <MenuItem value="Unreimbursed">Unreimbursed</MenuItem>
                    <MenuItem value="Reimbursed">Reimbursed</MenuItem>
                  </SelectStyled>

                <p className="InputCartText">
                    Date of Reimbursement
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    <p className="InputCartText">
                    Expense Comments
                    </p>

                    <InputStyled
                      id="outlined-basic"
                       type="text"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 200 }}
                      name="firstname"
                      multiline
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
            
                </div>
                <div className="InputCart">
                  <p className="InputCartText">
                    Cost Incurred By
                  </p>
                  <InputStyled
                      id="outlined-basic"
                      type="search"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                        },
                      }}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                  <p className="InputCartText">
                    Project
                  </p>
                  <InputStyled
                      id="outlined-basic"
                      type="text"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                </div> 
              </div>
               
              </div>
                </div>
              <div className="ModelPopupfooter">
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton} onClick={()=>handleCloseNewProjectCost()}>
                Cancel
              </button>
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton} onClick={()=>handleCloseNewProjectCost()}>
                Save
              </button>
            </div>
            </div>
          </Box>
        </Modal> 

          <Modal
          open={openGeneratedView}
          onClose={handleCloseGeneratedView}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box className="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
                         
              <div className="ModelPopupbody GeneratedView">
                <h3>Do you want to send an email or download the file named  {projectIdList.data?.uploadeddocument}</h3>   
                <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton} >
                Send Email
              </button>
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton} >
                Download
              </button>     
              </div>
              
            </div>
          </Box>
        </Modal> 

        <Modal
          open={openInvestorView}
          onClose={handleCloseInvestorView}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box className="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
            <div className="ModelPopupHeader">
                <p className="ModelPopupHeaderText">
                View Investor
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleCloseInvestorView()}
                  className="ModelPopupHeaderIcon"
                />
              </div>                         
              <div className="ModelPopupbody">
                <div class={Styles.ProjectDetailsInformationContent}>
                  <div class={Styles.ProjectDetailsInformationDetailsCard}>
                    <p class={Styles.ProjectDetailsInformationDetailsCardText}>Investor Name</p>
                    <p class={Styles.ProjectDetailsInformationDetailsCardTextdata}></p>
                  </div>
                  <div class={Styles.ProjectDetailsInformationDetailsCard}>
                    <p class={Styles.ProjectDetailsInformationDetailsCardText}>Final Amount</p>
                    <p class={Styles.ProjectDetailsInformationDetailsCardTextdata}></p>
                  </div>
                </div>
                <div class={Styles.ProjectDetailsInformationContent}>
                  <div class={Styles.ProjectDetailsInformationDetailsCard}>
                    <p class={Styles.ProjectDetailsInformationDetailsCardText}>Status</p>
                    <p class={Styles.ProjectDetailsInformationDetailsCardTextdata}></p>
                  </div>                 
                </div>                 
              </div>              
            </div>
          </Box>
        </Modal>   

         <Modal
          open={openNotesDoc}
          onClose={handleCloseNotesDoc}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box className="modal">
            <div className={Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer}>
            <div className="ModelPopupHeader">
                <p className="ModelPopupHeaderText">
                Add Notes
                </p>
                <CloseOutlinedIcon
                  onClick={() => handleCloseNotesDoc()}
                  className="ModelPopupHeaderIcon"
                />
              </div>                         
              <div className="ModelPopupbody">
              <div className={Styles.CreateProjetsdetailsAddPartysProjectTitleContainer}>
                <p className={Styles.CreateProjetsdetailsAddPartysProjectTitle}>
                  Information
                </p>                
              </div>
              <div className="InputContainer">
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">
                    Title
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}

                 
             
                  </div>
                  <div className="InputCart">
                  <p className="InputCartText">
                  Notes
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 200 }}
                      name="firstname"
                      multiline
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    </div>
                  </div>
                  </div>

              </div>
              <div className="ModelPopupfooter">
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton} onClick={()=>handleCloseNotesDoc()}>
                Cancel
              </button>
              <button className={Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton} onClick={()=>handleCloseNotesDoc()}>
                Save
              </button>
            </div>              
            </div>
          </Box>
        </Modal>            
        
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
                <MenuItem value="Active Raising">Active Raising</MenuItem>
                <MenuItem value="Active Investment">Active Investment</MenuItem>
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
                        onChange={(e) => setUpdateProject({ ...updateProject, projectname: e.target.value })}
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
                        onChange={(e) => setUpdateProject({ ...updateProject, status: e.target.value })}

                      >
                        <MenuItem value="">-None-</MenuItem>
                         <MenuItem value="All">All</MenuItem>
                                         <MenuItem value="Active Raising">Active Raising</MenuItem>
                                         <MenuItem value="Active Investment">Active Investment</MenuItem>
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
                        onChange={(e) => setUpdateProject({ ...updateProject, startdate: e.target.value })}
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
                        inputProps={{ maxLength:50 }}
                        //  value={projectIdList.data?.uploadeddocument}
                        name="uploadeddocument"
                        onChange={(e) => setUpdateProject({ ...updateProject, uploadeddocument: e.target.value })}
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
                        onChange={(e) => setUpdateProject({ ...updateProject, projectsummary: e.target.value })}/>
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
                        onChange={(e) => setUpdateProject({ ...updateProject, deadline: e.target.value })}
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
                        onChange={(e) => setUpdateProject({ ...updateProject, billedname: e.target.value })}
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
                        onChange={(e) => setUpdateProject({ ...updateProject, totalallocation: e.target.value })}
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
                        onChange={(e) => setUpdateProject({ ...updateProject, houseticketlink: e.target.value })}
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
                        onChange={(e) => setUpdateProject({ ...updateProject, generalcomments: e.target.value })}
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
                        onChange={(e) => setUpdateProject({ ...updateProject, totalcapitalization: e.target.value })}
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
                        onChange={(e) => setUpdateProject({ ...updateProject, totalraised: e.target.value })}
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
                        onChange={(e) => setUpdateProject({ ...updateProject, houseticketcomments: e.target.value })}
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
  );
};
export default ProjectDetails;
