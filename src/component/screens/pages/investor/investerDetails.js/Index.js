import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import HeaderPage from "../../header/Header";
import InvestorsImage from "../../../../assets/images/InvestorsImage.png";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
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
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { InputAdornment } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editInvestors, getInvestorById, getProjectByInvestorsId, getProjectByProducerId } from "../../../../redux/Action";


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

const InvestorDetails = () => {
  const theme = useTheme();
  let dispatch = useDispatch();
 const { investorid } = useParams();

 const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

   const investorById = useSelector(
     (state) => state.investors.getInvestorsByIdDetails
   );

   const projectList = useSelector(
     (state) => state.projects.getProjectbyProducerId
   );
 
     useEffect(() => {
       dispatch(getProjectByProducerId(storedUser.userid));
     }, []);

     console.log(projectList,"getProjectbyProducerId?.data")

   const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const [openEdit, setOpenEdit] = useState(false);
      const handleOpenEdit = () => setOpenEdit(true);
      const handleCloseEdit = () => setOpenEdit(false);
      const [role, setRole] = useState("");
      
        const handleChangeRole = (event) => {
          setRole(event.target.value);
        };
      

  // tab start
  const [searchValue, setSearchValue] = useState("");

  const [value, setValue] = useState(0);

  const [partiesAndNotesOpen, setPartiesAndNotesOpen] = useState(false);
  const [notesOpen, setnotesOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [updateID, setUpdateID] = useState(investorid);

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
        investorprobability:"",
        generalcomments: "",
         
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
            };
        
            dispatch(editInvestors({ id: updateID, data: updatedInvestor }));
            handleCloseEdit();
          };

    
      const addNewInvestor = () => {
        handleClose();
      };

       useEffect(() => {
        dispatch(getInvestorById(investorid));
      }, [investorid]);
      
    const [allData, setAllData] = useState([]);

   
      const tableHead = {
        no: "No",
        projectName: "Project Name",
        status: "Status",
        totalInvesment: "Total Invesment",
        action: "Actions",
      };
      const countPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
      const [collection, setCollection] = useState(
        cloneDeep(allData.slice(0, countPerPage))
      );
    
     useEffect(() => {
    
          if (projectList?.data) {
            const mappedData = projectList?.data.map((item, index) => ({
              no: index + 1,
              projectName: item.projectname,
              status: item.status,
              totalInvesment: item.totalallocation,
              action: (
                       <div className="TableActionContainer">
                           <EditOutlinedIcon className="TableActionEditIcon" />
                         
                            <Link to={`/project_details/${item.projectid}`} className="Link">
                              <RemoveRedEyeOutlinedIcon
                                 className="TableActionViewIcon"
                              />
                            </Link>
                           <DeleteOutlineOutlinedIcon
                             className="TableActionDeleteIcon"
                           />
                         </div>
                      ),
            }));
            setAllData(mappedData);
            setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
          }
        }, [projectList]);



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
    <div className={Styles.InvestorDetailsMainConatiner}>
      <HeaderPage />
      <div className={Styles.InvestorDetailsContainer}>
        <div className={Styles.InvestorDetailsNavConatiner}>
          <div className={Styles.InvestorDetailsNavImageConatiner}>
            <img
              src={InvestorsImage}
              alt="InvestorsImage"
              className={Styles.InvestorDetailsNavConatinerImg}
            />
            <p className={Styles.InvestorDetailsNavImageConatinerText}>
              Investors
            </p>
          </div>         
          <Link to="/investor" className="Link">
            <Tooltip title="Back to List" arrow>
              <KeyboardReturnIcon className={Styles.InvestorDetailsNavConatinerIcon} />
            </Tooltip>
          </Link>
        </div>
        <div className={Styles.InvestorDetailsTitleConatiner}>
          <p className={Styles.InvestorDetailsTitleConatinerText}>{investorById.data?.firstname} {investorById.data?.lastname} </p>
          <button className={Styles.InvestorDetailsTitleConatinerButton}  onClick={handleOpen}>
            Add Investors
          </button>
        </div>
        <div className={Styles.InvestorDetailsTabsAndNotesContainer}>
          <div className={Styles.InvestorDetailsTabs}>
            <div className={Styles.InvestorDetailsTabsContainer}>
              <Box sx={{ bgcolor: "background.paper" }}>
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
                  <div className={Styles.InvestorDetailsTabDetailsContainer}>
                    <div className={Styles.InvestorDetailsTabDetailsHeader}>
                      <p className={Styles.InvestorDetailsTabDetailsHeaderText}>
                        Investor Details
                      </p>
                      <EditOutlinedIcon onClick={handleOpenEdit}
                        className={
                          Styles.InvestorDetailsTabDetailsHeaderEditIcon
                        }
                      />
                    </div>
                    <div className={Styles.InvestorDetailsInformationContianer}>
                      <div className={Styles.InvestorDetailsInformationContent}>
                        <div className={ Styles.InvestorDetailsInformationDetailsCard}   >
                          <p   className={  Styles.InvestorDetailsInformationDetailsCardText }  > Investor Name </p>
                          <p  className={  Styles.InvestorDetailsInformationDetailsCardTextdata}  > {investorById.data?.firstname} {investorById.data?.lastname}  </p>
                        </div>
                        <div className={Styles.InvestorDetailsInformationDetailsCard} >
                          <p className={Styles.InvestorDetailsInformationDetailsCardText}> Email </p>
                          <p className={Styles.InvestorDetailsInformationDetailsCardTextdata}> {investorById.data?.emailid}</p>
                        </div>
                      </div>

                      <div className={Styles.InvestorDetailsInformationContent}>
                        <div className={ Styles.InvestorDetailsInformationDetailsCard}   >
                          <p   className={  Styles.InvestorDetailsInformationDetailsCardText }  > Phone</p>
                          <p  className={  Styles.InvestorDetailsInformationDetailsCardTextdata}  > {investorById.data?.mobilenumber}</p>
                        </div>
                        <div className={Styles.InvestorDetailsInformationDetailsCard} >
                          <p className={Styles.InvestorDetailsInformationDetailsCardText}> Street Address </p>
                          <p className={Styles.InvestorDetailsInformationDetailsCardTextdata}> {investorById.data?.address}</p>
                        </div>
                      </div>
                      <div className={Styles.InvestorDetailsInformationContent}>
                        <div className={ Styles.InvestorDetailsInformationDetailsCard}   >
                          <p   className={  Styles.InvestorDetailsInformationDetailsCardText }  > City</p>
                          <p  className={  Styles.InvestorDetailsInformationDetailsCardTextdata}  > {investorById.data?.city}</p>
                        </div>
                        <div className={Styles.InvestorDetailsInformationDetailsCard} >
                          <p className={Styles.InvestorDetailsInformationDetailsCardText}> State </p>
                          <p className={Styles.InvestorDetailsInformationDetailsCardTextdata}>{investorById.data?.state}</p>
                        </div>
                      </div>
                      <div className={Styles.InvestorDetailsInformationContent}>
                        <div className={ Styles.InvestorDetailsInformationDetailsCard}   >
                          <p   className={  Styles.InvestorDetailsInformationDetailsCardText }  > Zip Code</p>
                          <p  className={  Styles.InvestorDetailsInformationDetailsCardTextdata}  >{investorById.data?.zipcode}</p>
                        </div>
                        <div className={Styles.InvestorDetailsInformationDetailsCard} >
                          <p className={Styles.InvestorDetailsInformationDetailsCardText}> Accredited </p>
                          <p className={Styles.InvestorDetailsInformationDetailsCardTextdata}>{investorById.data?.accredited}</p>
                        </div>
                      </div>
                      <div className={Styles.InvestorDetailsInformationContent}>
                        <div className={ Styles.InvestorDetailsInformationDetailsCard}   >
                          <p   className={  Styles.InvestorDetailsInformationDetailsCardText }  > Refferral Source</p>
                          <p  className={  Styles.InvestorDetailsInformationDetailsCardTextdata}  >{investorById.data?.referralsource}</p>
                        </div>
                        <div className={Styles.InvestorDetailsInformationDetailsCard} >
                          <p className={Styles.InvestorDetailsInformationDetailsCardText}>Date Added</p>
                          <p className={Styles.InvestorDetailsInformationDetailsCardTextdata}>{investorById.data?.dateadded}</p>
                        </div>
                      </div>
                      <div className={Styles.InvestorDetailsInformationContent}>
                        <div className={ Styles.InvestorDetailsInformationDetailsCard}   >
                          <p   className={  Styles.InvestorDetailsInformationDetailsCardText }  > Investor Probability</p>
                          <p  className={  Styles.InvestorDetailsInformationDetailsCardTextdata}  >{investorById.data?.investorprobability}</p>
                        </div>
                        <div className={Styles.InvestorDetailsInformationDetailsCard} >
                          <p className={Styles.InvestorDetailsInformationDetailsCardText}>General Comments</p>
                          <p className={Styles.InvestorDetailsInformationDetailsCardTextdata}>{investorById.data?.generalcomments}</p>
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                <div>
                <div className={Styles.InvestorDetailsPageInvestorTableHeaderButtonContainer}>
                        <button className={Styles.InvestorDetailsPageInvestorTableHeaderButton} >Add New</button>
                </div>
                <div className={Styles.InvestorDetailsPageInvestorTabsContainerTable}>
                  <table>
                    <thead>
                      <tr>{headRow()}</tr>
                    </thead>
                    <tbody className="trhover">{tableData()}</tbody>
                  </table>
                  <div className={Styles.InvestorDetailsPageInvesotrTablePagination}>
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

          <div className={Styles.InvestorDetailsPartiesAndNotesContainer}>
            <div
              className={
                Styles.InvestorDetailsPartiesAndNotesContentMainContainer
              }
            >
              <div className={Styles.InvestorDetailsPartiesAndNotesContent}>
                <div
                  className={Styles.InvestorDetailsPartiesAndNotesContentHeader}
                >
                  <img src={PartiesImage} alt="PartiesImage" />
                  <p
                    className={
                      Styles.InvestorDetailsPartiesAndNotesContentHeaderText
                    }
                  >
                    Party's Project
                  </p>
                </div>
                <ExpandMoreOutlinedIcon
                  className={Styles.InvestorDetailsPAtiesAndNotesIcon}
                  onClick={() => HandleCahngePatiesAndNotes()}
                />
              </div>
              {partiesAndNotesOpen === true ? (
                <div className={Styles.InvestorDetailsPartiesContainer}>
                   <p className={Styles.InvestorDetailsPartiesContainerText}>
                    ABC Project  <span onClick={()=> handleOpenPartysProject()}><  AddBoxIcon /></span>
                  </p>
                  <div className={Styles.InvestorDetailsPartiesContent}>
                    <p className={Styles.InvestorDetailsPartiesContentTitle}>
                      Status
                    </p>
                    <p className={Styles.InvestorDetailsPartiesContentText}>
                      Investing In Deal
                    </p>
                  </div>
                  <div className={Styles.InvestorDetailsPartiesContent}>
                    <p className={Styles.InvestorDetailsPartiesContentTitle}>
                      Final Amount
                    </p>
                    <p className={Styles.InvestorDetailsPartiesContentText}>
                      $50,974
                    </p>
                  </div>
                  <div className={Styles.InvestorDetailsPartiesContent}>
                    <p className={Styles.InvestorDetailsPartiesContentTitle}>
                      Invesment Method
                    </p>
                    <p className={Styles.InvestorDetailsPartiesContentText}>
                      SVP
                    </p>
                  </div>
                  <p className={Styles.InvestorDetailsPartiesContainerText}>
                    ABC Project 
                  </p>
                  <div className={Styles.InvestorDetailsPartiesContent}>
                    <p className={Styles.InvestorDetailsPartiesContentTitle}>
                      XXX Project
                    </p>
                    <p className={Styles.InvestorDetailsPartiesContentText}>
                      Investing In Deal
                    </p>
                  </div>
                  <div className={Styles.InvestorDetailsPartiesContent}>
                    <p className={Styles.InvestorDetailsPartiesContentTitle}>
                      Final Amount
                    </p>
                    <p className={Styles.InvestorDetailsPartiesContentText}>
                      $25,000,00
                    </p>
                  </div>
                  <div className={Styles.InvestorDetailsPartiesContent}>
                    <p className={Styles.InvestorDetailsPartiesContentTitle}>
                      Invesment Method
                    </p>
                    <p className={Styles.InvestorDetailsPartiesContentText}>
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
                Styles.InvestorDetailsPartiesAndNotesContentMainContainer
              }
            >
              <div className={Styles.InvestorDetailsPartiesAndNotesContent}>
                <div
                  className={Styles.InvestorDetailsPartiesAndNotesContentHeader}
                >
                  <img src={NotesImage} alt="NotesImage" />
                  <p
                    className={
                      Styles.InvestorDetailsPartiesAndNotesContentHeaderText
                    }
                  >
                    Notes
                  </p>
                </div>
                <ExpandMoreOutlinedIcon
                  className={Styles.InvestorDetailsPAtiesAndNotesIcon}
                  onClick={() => HandleCahngeNotes()}
                />
              </div>
              {notesOpen === true ? (
                <div className={Styles.InvestorDetailsPartiesContainer}>
                 <p className={Styles.InvestorDetailsPartiesContainerText}>
                    Call With Robin  <span onClick={()=> handleOpenNotesDoc()}><  AddBoxIcon /></span>
                  </p>
                  <div className={Styles.InvestorDetailsPartiesContent}>
                    <p className={Styles.InvestorDetailsPartiesContentTitle}>
                      Note
                    </p>
                    <p className={Styles.InvestorDetailsPartiesContentText}>
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
              onClose={handleOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
               <Box className="modal">
                <div className={Styles.CreateInvestorMainContainer}>
                     <div className="ModelPopupHeader sam">
                                              <p className="ModelPopupHeaderText">
                                              Add Investor
                                              </p>
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
                        <p className="InputCartText">
                          First Name
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
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
                        <p className="InputCartText">
                          Last Name
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
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
                          inputProps={{ maxLength: 20 }}
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
                          inputProps={{ maxLength: 20 }}
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
                    <p className="InputCartText">
                          Street Address
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
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
                          inputProps={{ maxLength: 20 }}
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
                          inputProps={{ maxLength: 20 }}
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
                          inputProps={{ maxLength: 20 }}
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
                    <p className="InputCartText">
                          Accredited?
                        </p>
      
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
                        <p className="InputCartText">
                          Refferral Source
                        </p>
      
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
                          <MenuItem value={10}>-None-</MenuItem>
                          <MenuItem value={20}>Co-Producer</MenuItem>                   
                        </SelectStyled>
                        {/* {error?.username && (
                    <span className={Styles.registerErrormsg}>{error?.username}</span>
                  )} */}
                      </div>
                    </div>
                    <div className="InputContent">
                    <div className="InputCart">
                    <p className="InputCartText">
                          Date Added
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="date_added"
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
                        <p className="InputCartText">
                          Investor Probability
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 20 }}
                          name="investor_probability"
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
                    <div className="InputContent"> 
                    <div className="InputCart">             
                    <p className="InputCartText">
                        General Comments
                      </p>
                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength: 200 }}
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
              onClose={handleOpenEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
               <Box className="modal">
                <div className={Styles.CreateInvestorMainContainer}>
                     <div className="ModelPopupHeader sam">
                                              <p className="ModelPopupHeaderText">
                                              Edit Investor
                                              </p>
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
                        <p className="InputCartText">
                          First Name
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          name="firstname"
                          defaultValue= {investorById.data?.firstname}
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
                        <p className="InputCartText">
                          Last Name
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue= {investorById.data?.lastname}
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
                          defaultValue= {investorById.data?.emailid}
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
                          inputProps={{ maxLength:50 }}
                          defaultValue= {investorById.data?.mobilenumber}
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
                    <p className="InputCartText">
                          Street Address
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue= {investorById.data?.address}
                          name="address"
                          onChange={(e) =>
                            setCreateInvestor({
                              ...createInvestor,
                              addtess: e.target.value,
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
                          defaultValue= {investorById.data?.city}
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
                          defaultValue= {investorById.data?.state}
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
                          defaultValue= {investorById.data?.zipcode}
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
                    <p className="InputCartText">
                          Accredited?
                        </p>
      
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
                        <p className="InputCartText">
                          Refferrel Source
                        </p>
      
                        <SelectStyled
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={investorById.data?.referralsource}
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
                    <p className="InputCartText">
                          Date Added
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue= {investorById.data?.dateadded}
                          name="date_added"
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
                        <p className="InputCartText">
                          Investor Probability
                        </p>
      
                        <InputStyled
                          id="outlined-basic"
                          className={Styles.LoginPageInputContainerInput}
                          inputProps={{ maxLength: 50 }}
                          defaultValue= {investorById.data?.investorprobability}
                          name="investor_probability"
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
                    <div className="InputContent"> 
                    <div className="InputCart">             
                    <p className="InputCartText">
                        General Comments
                      </p>
                      <InputStyled
                        id="outlined-basic"
                        className={Styles.LoginPageInputContainerInput}
                        inputProps={{ maxLength:50000 }}
                        name="username"
                        multiline
                        rows={4}
                        defaultValue= {investorById.data?.generalcomments}
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
                      onClick={() => editinvestor()}
                    >
                      Save
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
                    <div className="PageHeader">
                      <p className="PageTableTitleText">
                        Information
                      </p>
                    </div>
                    <div className="InputContainer">
                      <div className="InputContent">
                        <div className="InputCart">
                          <p className="InputCartText">
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
                  <p className="InputCartText">
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
                          <p className="InputCartText">
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
                            checked={createInvestor.documentsReceived || false}
                            onChange={(e) =>
                              setCreateInvestor({
                                ...createInvestor,
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
                            checked={createInvestor.FundsReceived || false}
                            onChange={(e) =>
                              setCreateInvestor({
                                ...createInvestor,
                                FundsReceived: e.target.checked,
                              })
                            }
                          />
                          </div>
                          {/* {error?.username && (
                            <span className={Styles.registerErrormsg}>{error?.username}</span>
                          )} */}
                          <p className="InputCartText">
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
                        <div className="InputCart">
                        <p className="InputCartText">
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
                  <p className="InputCartText">
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
                          <p className="InputCartText">
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
                           <p className="InputCartText">
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
                           <p className="InputCartText">
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
                          <p className="InputCartText">
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
                          <p className="InputCartText">
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
                    <button className="CancelButton" onClick={()=>handleClosePartysProject()}>
                      Cancel
                    </button>
                    <button className="SubmitButton" onClick={()=>handleClosePartysProject()}>
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
                    <button className="CancelButton" onClick={()=>handleCloseNotesDoc()}>
                      Cancel
                    </button>
                    <button className="SubmitButton" onClick={()=>handleCloseNotesDoc()}>
                      Save
                    </button>
                  </div> 
                             
                  </div>
                </Box>
              </Modal> 

    </div>
  );
};
export default InvestorDetails;