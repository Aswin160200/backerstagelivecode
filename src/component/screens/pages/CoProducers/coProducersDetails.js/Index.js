import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import HeaderPage from "../../header/Header";
import InvestorsImage from "../../../../assets/images/InvestorsImage.png";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import PartiesImage from "../../../../assets/images/PartiesImage.png";
import NotesImage from "../../../../assets/images/NotesImage.png";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByCoProducersId, getProjectByCoProducerID } from "../../../../redux/Action";


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

const CoProducersDetails = () => {
  const theme = useTheme();
  let dispatch = useDispatch();

  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

 const { co_producersid } = useParams();
  const [role, setRole] = useState("");

        const coProducersId = useSelector(
          (state) => state.coProducers.getByCoProducersIdSuccessfull
        );
      
        const projectCoProducerID = useSelector(
          (state) => state.coProducers.getProjectByCoProducersId
        );

   useEffect(() => {
      dispatch(getProjectByCoProducerID());
    }, []);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

     useEffect(() => {
        dispatch(getByCoProducersId(co_producersid));
      }, [co_producersid]);

  const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

   

    const [createCoProducers, setCreateCoProducers] = useState({
      producersid:storedUser.userid,
      firstname: "",
      lastname: "",
      emailid: "",
      phone: "",
      legalentity: "",
      street: "",
      city: "",
      state: "",
      totalallocation: "",
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
    
      const addNewCoProducers = () => {
        handleClose();
      };
    


  // tab start
  const [searchValue, setSearchValue] = useState("");

  const [value, setValue] = useState(0);

  const [partiesAndNotesOpen, setPartiesAndNotesOpen] = useState(false);
  const [notesOpen, setnotesOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    //   add Party's Project start
    const [openPartysProject, setOpenPartysProject] = useState(false);
    const handleOpenPartysProject = () => setOpenPartysProject(true);
    const handleClosePartysProject = () => setOpenPartysProject(false);
    //   add Party's Project End

    //   Notes start
    const [openNotesDoc, setOpenNotesDoc] = useState(false);
    const handleOpenNotesDoc = () => setOpenNotesDoc(true);
    const handleCloseNotesDoc = () => setOpenNotesDoc(false);
    //   Notes end

  const HandleCahngePatiesAndNotes = () => {
    if (partiesAndNotesOpen === false) {
      setPartiesAndNotesOpen(true);
    } else {
      setPartiesAndNotesOpen(false);
    }
  };

  const HandleCahngeNotes = () => {
    if (notesOpen === false) {
      setnotesOpen(true);
    } else {
      setnotesOpen(false);
    }
  };

  const [allData, setAllData] = useState([]);


      const tableHead = {
        no: "No",
        projectName: "Project Name",
        viewInvestor: "View Investor",
        status: "Status",
        startDate:"Start Date",
        totalRaised:"Total Raised",
        action: "Actions",
      };
      const countPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
      const [collection, setCollection] = useState(
        cloneDeep(allData.slice(0, countPerPage))
      );
    
    
   useEffect(() => {
        if (projectCoProducerID?.data) {
          const mappedData = projectCoProducerID?.data.map((item, index) => ({
            no: index + 1,
            projectName: item.projectname,
            viewInvestor: "View",
            status: item.status,
            startDate: item.startdate,
            totalRaised: item.totalraised,
            action: (
                  <div className="TableActionContainer">
                     <EditOutlinedIcon className="TableActionEditIcon" />
                     <RemoveRedEyeOutlinedIcon
                       className="TableActionViewIcon"
                     />
                     <DeleteOutlineOutlinedIcon
                     className="TableActionDeleteIcon"
                     />
                   </div>
                 ),
          }));
          setAllData(mappedData);
          setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
        }
      }, [projectCoProducerID]);
 


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

  return (
    <div className={Styles.CoProducersDetailsMainConatiner}>
      <HeaderPage />
      <div className={Styles.CoProducersDetailsContainer}>
        <div className={Styles.CoProducersDetailsNavConatiner}>
          <div className={Styles.CoProducersDetailsNavImageConatiner}>
            <img
              src={InvestorsImage}
              alt="InvestorsImage"
              className={Styles.CoProducersDetailsNavConatinerImg}
            />
            <p className={Styles.CoProducersDetailsNavImageConatinerText}>
              Co-Producers
            </p>
          </div>
          <Link to="/co_producers" className="Link">
            <Tooltip title="Back to List" arrow>
            <span className='InvestorDetailsNavConatinerIcon'>&#8629;</span>
            </Tooltip>
          </Link>
        </div>
        <div className={Styles.CoProducersDetailsTitleConatiner}>
          <p className={Styles.CoProducersDetailsTitleConatinerText}>{coProducersId.data?.firstname}{coProducersId.data?.lastname}</p>
          <button className={Styles.CoProducersDetailsTitleConatinerButton} onClick={handleOpen}>
            Add Co-Producers
          </button>
        </div>
        <div className={Styles.CoProducersDetailsTabsAndNotesContainer}>
          <div className={Styles.CoProducersDetailsTabs}>
            <div className={Styles.CoProducersDetailsTabsContainer}>
              <Box >
                <AppBar
                  position="static"
                  sx={{ bgcolor: "#fff", borderRadius: "10px", boxShadow: "none" }}
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
                    <Tab
                      label={<p className={Styles.TabAddIconTExt}>Projects</p>}
                      {...a11yProps(1)}
                      sx={{ maxWidth: "15% !important" }}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <div className={Styles.CoProducersDetailsTabDetailsContainer}>
                    <div className={Styles.CoProducersDetailsTabDetailsHeader}>
                      <p className={Styles.CoProducersDetailsTabDetailsHeaderText}>
                       Co-Producers Info
                      </p>
                      <EditOutlinedIcon
                        className={
                          Styles.CoProducersDetailsTabDetailsHeaderEditIcon 
                        }
                        onClick={handleOpenEdit}/>
                    </div>
                    <div className={Styles.CoProducersDetailsInformationContianer}>
                      <div className={Styles.CoProducersDetailsInformationContent}>
                        <div className={ Styles.CoProducersDetailsInformationDetailsCard}   >
                          <p   className={  Styles.CoProducersDetailsInformationDetailsCardText }  >Co-Producer Name</p>
                          <p  className={  Styles.CoProducersDetailsInformationDetailsCardTextdata}  >{coProducersId.data?.firstname}{coProducersId.data?.lastname}</p>
                        </div>
                        <div className={Styles.CoProducersDetailsInformationDetailsCard} >
                          <p className={Styles.CoProducersDetailsInformationDetailsCardText}> Email </p>
                          <p className={Styles.CoProducersDetailsInformationDetailsCardTextdata}>{coProducersId.data?.emailid}</p>
                        </div>
                      </div>

                      <div className={Styles.CoProducersDetailsInformationContent}>
                        <div className={ Styles.CoProducersDetailsInformationDetailsCard}   >
                          <p   className={  Styles.CoProducersDetailsInformationDetailsCardText }  > Phone</p>
                          <p  className={  Styles.CoProducersDetailsInformationDetailsCardTextdata}  >{coProducersId.data?.phone}</p>
                        </div>
                        <div className={Styles.CoProducersDetailsInformationDetailsCard} >
                          <p className={Styles.CoProducersDetailsInformationDetailsCardText}> Legal Entity  </p>
                          <p className={Styles.CoProducersDetailsInformationDetailsCardTextdata}>{coProducersId.data?.legalentity}</p>
                        </div>
                      </div>
                      <div className={Styles.CoProducersDetailsInformationContent}>
                        <div className={ Styles.CoProducersDetailsInformationDetailsCard}   >
                          <p   className={  Styles.CoProducersDetailsInformationDetailsCardText }  >Street Address</p>
                          <p  className={  Styles.CoProducersDetailsInformationDetailsCardTextdata}  >{coProducersId.data?.street}</p>
                        </div>
                        <div className={Styles.CoProducersDetailsInformationDetailsCard} >
                          <p className={Styles.CoProducersDetailsInformationDetailsCardText}> City </p>
                          <p className={Styles.CoProducersDetailsInformationDetailsCardTextdata}>{coProducersId.data?.city}</p>
                        </div>
                      </div>
                      <div className={Styles.CoProducersDetailsInformationContent}>
                        <div className={ Styles.CoProducersDetailsInformationDetailsCard}   >
                          <p   className={  Styles.CoProducersDetailsInformationDetailsCardText }  > State</p>
                          <p  className={  Styles.CoProducersDetailsInformationDetailsCardTextdata}  >{coProducersId.data?.state}</p>
                        </div>
                        <div className={Styles.CoProducersDetailsInformationDetailsCard} >
                          <p className={Styles.CoProducersDetailsInformationDetailsCardText}> Zip Code </p>
                          <p className={Styles.CoProducersDetailsInformationDetailsCardTextdata}>534553</p>
                        </div>
                      </div>
                      <div className={Styles.CoProducersDetailsInformationContent}>
                        <div className={ Styles.CoProducersDetailsInformationDetailsCard}   >
                          <p   className={  Styles.CoProducersDetailsInformationDetailsCardText }  > Totla Allocation</p>
                          <p  className={  Styles.CoProducersDetailsInformationDetailsCardTextdata}  >{coProducersId.data?.totalallocation}</p>

                          </div>
                        <div className={Styles.CoProducersDetailsInformationDetailsCard} >
                          <p className={Styles.CoProducersDetailsInformationDetailsCardText}>Status</p>
                          <p className={Styles.CoProducersDetailsInformationDetailsCardTextdata}>{coProducersId.data?.status}</p>
                        </div>
                      </div>
                      <div className={Styles.CoProducersDetailsInformationContent}>
                        <div className={ Styles.CoProducersDetailsInformationDetailsCard}   >
                          <p   className={  Styles.CoProducersDetailsInformationDetailsCardText }  > Total Raised</p>
                          <p  className={  Styles.CoProducersDetailsInformationDetailsCardTextdata}  >{coProducersId.data?.total_raised}</p>
                        </div>
                        <div className={Styles.CoProducersDetailsInformationDetailsCard} >
                          <p className={Styles.CoProducersDetailsInformationDetailsCardText}>Entitlememnt</p>
                          <p className={Styles.CoProducersDetailsInformationDetailsCardTextdata}>{coProducersId.data?.entityelements}</p>
                        </div>
                      </div>
                      <div className={Styles.CoProducersDetailsInformationContent}>
                        <div className={Styles.CoProducersDetailsInformationDetailsCard} >
                          <p className={Styles.CoProducersDetailsInformationDetailsCardText}>General Comments</p>
                          <p className={Styles.CoProducersDetailsInformationDetailsCardTextdata}>{coProducersId.data?.generalcomments}</p>
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                <div>
                <div className={Styles.CoProducersDetailsPageInvestorTableHeaderButtonContainer}>
                        <button className={Styles.CoProducersDetailsPageInvestorTableHeaderButton} >Add New</button>
                </div>
                <div className={Styles.CoProducersDetailsPageInvestorTabsContainerTable}>
                  <table>
                    <thead>
                      <tr>{headRow()}</tr>
                    </thead>
                    <tbody className="trhover">{tableData()}</tbody>
                  </table>
                  <div className={Styles.CoProducersDetailsPageInvesotrTablePagination}>
                    <Pagination
                      pageSize={countPerPage}
                      onChange={updatePage}
                      current={currentPage}
                      total={allData.length}
                    />
                  </div>
                </div>
              </div>
                </TabPanel>
              </Box>
            </div>
          </div>

          <div className={Styles.CoProducersDetailsPartiesAndNotesContainer}>
            <div
              className={
                Styles.CoProducersDetailsPartiesAndNotesContentMainContainer
              }
            >
              <div className={Styles.CoProducersDetailsPartiesAndNotesContent}>
                <div
                  className={Styles.CoProducersDetailsPartiesAndNotesContentHeader}
                >
                  <img src={PartiesImage} alt="PartiesImage" />
                  <p
                    className={
                      Styles.CoProducersDetailsPartiesAndNotesContentHeaderText
                    }
                  >
                    Party's Project
                  </p>
                </div>
                <ExpandMoreOutlinedIcon
                  className={Styles.CoProducersDetailsPAtiesAndNotesIcon}
                  onClick={() => HandleCahngePatiesAndNotes()}
                />
              </div>
              {partiesAndNotesOpen === true ? (
                <div className={Styles.CoProducersDetailsPartiesContainer}>
                  <p className={Styles.CoProducersDetailsPartiesContainerText}>
                    ABC Project  <span onClick={()=> handleOpenPartysProject()}><  AddBoxIcon /></span>
                  </p>
                  <div className={Styles.CoProducersDetailsPartiesContent}>
                    <p className={Styles.CoProducersDetailsPartiesContentTitle}>
                      Status
                    </p>
                    <p className={Styles.CoProducersDetailsPartiesContentText}>
                      Investing In Deal
                    </p>
                  </div>
                  <div className={Styles.CoProducersDetailsPartiesContent}>
                    <p className={Styles.CoProducersDetailsPartiesContentTitle}>
                      Final Amount
                    </p>
                    <p className={Styles.CoProducersDetailsPartiesContentText}>
                      $50,974
                    </p>
                  </div>
                  <div className={Styles.CoProducersDetailsPartiesContent}>
                    <p className={Styles.CoProducersDetailsPartiesContentTitle}>
                      Invesment Method
                    </p>
                    <p className={Styles.CoProducersDetailsPartiesContentText}>
                      SVP
                    </p>
                  </div>
                  <p className={Styles.CoProducersDetailsPartiesContainerText}>
                    ABC Project 
                  </p>
                  <div className={Styles.CoProducersDetailsPartiesContent}>
                    <p className={Styles.CoProducersDetailsPartiesContentTitle}>
                      XXX Project
                    </p>
                    <p className={Styles.CoProducersDetailsPartiesContentText}>
                      Investing In Deal
                    </p>
                  </div>
                  <div className={Styles.CoProducersDetailsPartiesContent}>
                    <p className={Styles.CoProducersDetailsPartiesContentTitle}>
                      Final Amount
                    </p>
                    <p className={Styles.CoProducersDetailsPartiesContentText}>
                      $25,000,00
                    </p>
                  </div>
                  <div className={Styles.CoProducersDetailsPartiesContent}>
                    <p className={Styles.CoProducersDetailsPartiesContentTitle}>
                      Invesment Method
                    </p>
                    <p className={Styles.CoProducersDetailsPartiesContentText}>
                      Direct To Production
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className={
                Styles.CoProducersDetailsPartiesAndNotesContentMainContainer
              }
            >
              <div className={Styles.CoProducersDetailsPartiesAndNotesContent}>
                <div
                  className={Styles.CoProducersDetailsPartiesAndNotesContentHeader}
                >
                  <img src={NotesImage} alt="NotesImage" />
                  <p
                    className={
                      Styles.CoProducersDetailsPartiesAndNotesContentHeaderText
                    }
                  >
                    Notes
                  </p>
                </div>
                <ExpandMoreOutlinedIcon
                  className={Styles.CoProducersDetailsPAtiesAndNotesIcon}
                  onClick={() => HandleCahngeNotes()}
                />
              </div>
              {notesOpen === true ? (
                <div className={Styles.CoProducersDetailsPartiesContainer}>
                  <p className={Styles.CoProducersDetailsPartiesContainerText}>
                    Call With Robin  <span onClick={()=> handleOpenNotesDoc()}><  AddBoxIcon /></span>
                  </p>
                  <div className={Styles.CoProducersDetailsPartiesContent}>
                    <p className={Styles.CoProducersDetailsPartiesContentTitle}>
                      Note
                    </p>
                    <p className={Styles.CoProducersDetailsPartiesContentText}>
                      Spoke with Robin
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
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
                    inputProps={{ maxLength: 20 }}
                    name="firstname"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    inputProps={{ maxLength: 20 }}
                    name="lastname"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    inputProps={{ maxLength: 20 }}
                    name="emailid"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    inputProps={{ maxLength: 20 }}
                    name="mobilenumber"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        mobilenumber: e.target.value,
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
                    Street Address
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="addtess"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        addtess: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>City</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="city"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        city: e.target.value,
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
                  <p className={Styles.CreateCoProducersInputCartText}>State</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="state"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        state: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>Zip Code</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="zipcode"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        zipcode: e.target.value,
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
                    Accredited?
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="accredited"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        accredited: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Refferral Source
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="username"
                    // onChange={(e) => setCreateCoProducers({ ...createCoProducers,: e.target.value })}
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputContent}>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    Date Added
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="date_added"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        date_added: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>
                    CoProducers Probability
                  </p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 20 }}
                    name="CoProducers_probability"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        CoProducers_probability: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
              </div>
              <div className={Styles.CreateCoProducersInputCartSingleInput}>
                <p className={Styles.CreateCoProducersInputCartText}>
                  General Comments
                </p>
                <InputStyled
                  id="outlined-basic"
                  className={Styles.LoginPageInputContainerInput}
                  inputProps={{ maxLength: 200 }}
                  name="username"
                  onChange={(e) =>
                    setCreateCoProducers({
                      ...createCoProducers,
                      general_comments: e.target.value,
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
                    name="firstname"
                    defaultValue={coProducersId.data?.firstname}
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    inputProps={{ maxLength:50 }}
                    name="lastname"
                    defaultValue={coProducersId.data?.lastname}
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.emailid}
                    name="emailid"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.phone}
                    name="mobilenumber"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.legalentity}
                    name="addtess"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.street}
                    name="addtess"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.city}
                    name="city"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.state}
                    name="state"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.totalallocation}
                    name="zipcode"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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

                  <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={coProducersId.data?.status}
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
                  </SelectStyled>
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
                    defaultValue={coProducersId.data?.total_raised}
                    name="date_added"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.entityelements}
                    name="CoProducers_probability"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                      inputProps={{ maxLength: 500000 }}
                      name="lastname"
                      multiline
                      defaultValue={coProducersId.data?.generalcomments}
                      rows={4}
                      onChange={(e) =>
                        setCreateCoProducers({
                          ...createCoProducers,
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
                    name="firstname"
                    defaultValue={coProducersId.data?.firstname}
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.lastname}
                    name="lastname"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.emailid}
                    name="emailid"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.phone}
                    name="mobilenumber"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.legalentity}
                    name="addtess"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.street}
                    name="addtess"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.city}
                    inputProps={{ maxLength: 50 }}
                    name="city"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.state}
                    name="state"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                  <p className={Styles.CreateCoProducersInputCartText}>Zip Code</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    defaultValue=""
                    name="zipcode"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        zipcode: e.target.value,
                      })
                    }
                  />
                  {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                </div>
                <div className={Styles.CreateCoProducersInputCart}>
                  <p className={Styles.CreateCoProducersInputCartText}>Total Allocation</p>

                  <InputStyled
                    id="outlined-basic"
                    className={Styles.LoginPageInputContainerInput}
                    inputProps={{ maxLength: 50 }}
                    defaultValue={coProducersId.data?.totalallocation}
                    name="zipcode"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        zipcode: e.target.value,
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

                  <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={coProducersId.data?.status}  
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
                        status: e.target.value,
                      })
                    }
                  >
                     <MenuItem value={10}>-None-</MenuItem>
                    <MenuItem value="Interested">Interested</MenuItem>
                    <MenuItem value="Investing In Project">Investing In Project</MenuItem>
                    <MenuItem value="Passing On Project">Passing On Project</MenuItem>
                  </SelectStyled>
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
                    defaultValue={coProducersId.data?.total_raised}  
                    name="date_added"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                    defaultValue={coProducersId.data?.entityelements}  
                    name="CoProducers_probability"
                    onChange={(e) =>
                      setCreateCoProducers({
                        ...createCoProducers,
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
                      inputProps={{ maxLength: 5000 }}
                      name="lastname"
                      defaultValue={coProducersId.data?.generalcomments}  
                      multiline
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
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
                          inputProps={{ maxLength: 20 }}
                          name="firstname"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
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
                          inputProps={{ maxLength: 20 }}
                          name="lastname"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
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
                          inputProps={{ maxLength: 20 }}
                          name="emailid"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
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
                          inputProps={{ maxLength: 20 }}
                          name="mobilenumber"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
                              mobilenumber: e.target.value,
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
                          inputProps={{ maxLength: 20 }}
                          name="addtess"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
                              addtess: e.target.value,
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
                          inputProps={{ maxLength: 20 }}
                          name="addtess"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
                              addtess: e.target.value,
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
                          inputProps={{ maxLength: 20 }}
                          name="city"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
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
                          inputProps={{ maxLength: 20 }}
                          name="state"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
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
                        <p className={Styles.CreateCoProducersInputCartText}>Zip Code</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="zipcode"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
                              zipcode: e.target.value,
                            })
                          }
                        />
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                      <div className={Styles.CreateCoProducersInputCart}>
                        <p className={Styles.CreateCoProducersInputCartText}>Total Allocation</p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="zipcode"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
                              zipcode: e.target.value,
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
      
                        <SelectStyled
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={role}
                          onChange={handleChangeRole}
                        >
                           <MenuItem value={10}>-None-</MenuItem>
                          <MenuItem value={20}>Interested</MenuItem>
                          <MenuItem value={30}>Investing In Project</MenuItem>
                          <MenuItem value={40}>Passing On Project</MenuItem>
                        </SelectStyled>
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
                          inputProps={{ maxLength: 20 }}
                          name="date_added"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
                              date_added: e.target.value,
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
                          inputProps={{ maxLength: 20 }}
                          name="CoProducers_probability"
                          onChange={(e) =>
                            setCreateCoProducers({
                              ...createCoProducers,
                              CoProducers_probability: e.target.value,
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
                            inputProps={{ maxLength: 200 }}
                            name="lastname"
                            multiline
                            rows={4}
                            // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                          />
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
                      onClick={() => handleClose()}
                    >
                      Cancel
                    </button>
                    <button
                      className={Styles.CreateCoProducersSubmitButton}
                      onClick={() => addNewCoProducers()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>

        <Modal
          open={openPartysProject}
          onClose={handleClosePartysProject}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box class="modal">
            <div className={Styles.CreateCoProducersMainContainer}>
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
                <p className={Styles.CreateCoProducersTitle}>
                  Information
                </p>
              </div>
              <div className={Styles.CreateCoProducersInputContainer}>
                <div className={Styles.CreateCoProducersInputContent}>
                  <div className={Styles.CreateCoProducersInputCart}>
                    <p className={Styles.CreateCoProducersInputCartText}>
                      Investor
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
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
            <p className={Styles.CreateCoProducersInputCartText}>
                      Investing Entity Name
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 200 }}
                      name="lastname"
                      multiline
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                     <p className={Styles.CreateCoProducersInputCartText}>
                    Status
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={handleChangeRole}
                  >
                     <MenuItem value={10}>-None-</MenuItem>
                    <MenuItem value={20}>Interested</MenuItem>
                    <MenuItem value={30}>Investing In Project</MenuItem>
                    <MenuItem value={40}>Passing On Project</MenuItem>
                  </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                     <p className="InputCartText">
                           Documents Received
                          </p>
      
                          <div className="checkInput">
                          <input
                            type="checkbox"
                            name="documentsReceived"
                            checked={createCoProducers.documentsReceived || false}
                            onChange={(e) =>
                              setCreateCoProducers({
                                ...createCoProducers,
                                documentsReceived: e.target.checked,
                              })
                            }
                          />
                          </div>  
                          {/* {error?.username && (
                            <span className={Styles.registerErrormsg}>{error?.username}</span>
                          )} */}
                          <p className="InputCartText">
                            Funds Received
                          </p>
                          <div className="checkInput"> 
                          <input
                            type="checkbox"
                            name="FundsReceived"
                            checked={createCoProducers.FundsReceived || false}
                            onChange={(e) =>
                              setCreateCoProducers({
                                ...createCoProducers,
                                FundsReceived: e.target.checked,
                              })
                            }
                          />
                          </div>
                          {/* {error?.username && (
                            <span className={Styles.registerErrormsg}>{error?.username}</span>
                          )} */}
                    <p className={Styles.CreateCoProducersInputCartText}>
                      Investment Round
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 200 }}
                      name="lastname"
                      multiline
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, firstname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                  <div className={Styles.CreateCoProducersInputCart}>
                    <p className={Styles.CreateCoProducersInputCartText}>
                      Project
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
            <p className={Styles.CreateCoProducersInputCartText}>
                      Investment Method
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={handleChangeRole}
                  >
                    <MenuItem value={10}>-None-</MenuItem>
                    <MenuItem value={20}>SPV</MenuItem>
                    <MenuItem value={30}>Direct to Production</MenuItem>
                  </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateCoProducersInputCartText}>
                      Interested Amount
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
                     <p className={Styles.CreateCoProducersInputCartText}>
                    Final Amount
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
                     <p className={Styles.CreateCoProducersInputCartText}>
                      Investor Comments
                    </p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 200 }}
                      name="lastname"
                      multiline
                      rows={4}
                      // onChange={(e) => setCreateInvestor({ ...createInvestor, lastname: e.target.value })}
                    />
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                    <p className={Styles.CreateCoProducersInputCartText}>
                    Bonus/Perks
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
                    <p className={Styles.CreateCoProducersInputCartText}>
                    Co-Producer
                    </p>

                    <SelectStyled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={handleChangeRole}
                  >
                     <MenuItem value={10}>-None-</MenuItem>
                    <MenuItem value={20}></MenuItem>
                    <MenuItem value={30}></MenuItem>
                    <MenuItem value={40}></MenuItem>
                  </SelectStyled>
                    {/* {error?.username && (
                      <span className={Styles.registerErrormsg}>{error?.username}</span>
                    )} */}
                  </div>
                </div>
                
              
              </div>
              </div>
              <div className="ModelPopupfooter">
              <button className={Styles.CreateCoProducersCancelButton} onClick={()=>handleClosePartysProject()}>
                Cancel
              </button>
              <button className={Styles.CreateCoProducersSubmitButton} onClick={()=>handleClosePartysProject()}>
                Save
              </button>
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
              <button className={Styles.CreateCoProducersCancelButton} onClick={()=>handleCloseNotesDoc()}>
                Cancel
              </button>
              <button className={Styles.CreateCoProducersSubmitButton} onClick={()=>handleCloseNotesDoc()}>
                Save
              </button>
            </div> 
                       
            </div>
          </Box>
        </Modal>  

    </div>
  );
};
export default CoProducersDetails;
