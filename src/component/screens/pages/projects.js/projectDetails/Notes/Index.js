import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useRef } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Box, Modal } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editByDistributionId,
  editByProjectCostId,
  editNotesdata,
  getAllProjectCost,
  getByDistributionId,
  getByProducersId,
  getByProjectCostId,
  getByProjectId,
  getProjectByProducerId,
  getProjectCostByProducersId,
  getProjectsByID,
} from "../../../../../redux/Action";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

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

const NotesPage = () => {
  let dispatch = useDispatch();
  const { projectid } = useParams();
  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const projectList = useSelector(
    (state) => state.projects.getProjectbyProducerId
  );

  const noteList = useSelector(
    (state) => state.notes.getNotesByProjectIDSuccessfull
  );
  const ProjectCostByProducer = useSelector(
    (state) => state.projectCost.getByProducersIdSuccessfull
  );

  const projectCostById = useSelector(
    (state) => state.projectCost.getByProjectCostIdSuccessfull
  );
  const notesIdList = useSelector(
      (state) => state.projects.getNotesByProjectIDSuccessfull
    );


    console.log("notesIdList",notesIdList)
  useEffect(() => {
    dispatch(getByProjectId(projectid));
    dispatch(getProjectCostByProducersId(storedUser.userid));
    dispatch(getProjectByProducerId(storedUser.userid));
     dispatch(getProjectsByID(projectid));
  }, []);

  const [allData, setAllData] = useState([]);
  const [updateID, setupdateID] = useState();

  const [editNotes, setEditNotes] = useState(
    {
    projectid:projectid,
    investorid: null,
    producersid: storedUser.userid,
    co_producersid:null,
    notetitle: "",
    notedescription: ""
  }
);

  //   Add New Project Cost start
  const [openNewProjectCost, setOpenNewProjectCost] = useState(false);
  const handleOpenNewProjectCost = (id) => {
    setupdateID(id);
    dispatch(getByProjectId(projectid));
    setOpenNewProjectCost(true);
  };
  const handleCloseNewProjectCost = () => setOpenNewProjectCost(false);

  const handleEditProjectCost = () => {
    dispatch(editNotesdata({ id: updateID, data: editNotes }));
    setOpenNewProjectCost(false);
    dispatch(getProjectCostByProducersId(storedUser.userid));
  };

 const [deleteConfimationModelOpen, setDeleteConfimationModelOpen] =useState(false);
   const handlesetDeleteConfimationModelOpen = (id) => {
        setupdateID(id);
      setDeleteConfimationModelOpen(true);
      dispatch(getByProjectCostId(id));
    };
    const handlesetDeleteConfimationModelClose = () =>{
      setDeleteConfimationModelOpen(false);
    }
  
  

  //   view ProjectCost
  const [openViewProjectCost, setOpenViewProjectCost] = useState(false);
  const handleOpenViewDistribution = (id) => {
    dispatch(getByProjectCostId(id));
    setOpenViewProjectCost(true);
  };
  const handleCloseViewDistribution = () => setOpenViewProjectCost(false);

  const tableHead = {
    noteTitle: "Note",
    noteDiscription: "Note Discription",
   
    action: "Actions",
  };
  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  useEffect(() => {
    if (
      noteList?.data &&
      Array.isArray(noteList.data)
    ) {
      const mappedData = noteList?.data.map((item, index) => ({
        no: index + 1,
        noteTitle: item.notetitle,
        noteDiscription: item.notedescription,
        action: (
          <div className="TableActionContainer">
            <EditOutlinedIcon
              className="TableActionEditIcon"
              onClick={() => handleOpenNewProjectCost(item.noteid)}
            />
            <RemoveRedEyeOutlinedIcon
              className="TableActionViewIcon"
              onClick={() => handleOpenViewDistribution(item.noteid)}
            />
            <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" 
            onClick={()=> handlesetDeleteConfimationModelOpen(item.noteid)}/>
          </div>
        ),
      }));

      setAllData(mappedData);
      setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
    } else {
      console.error(
        "Distribution.data is not an array",
        noteList?.data
      );
    }
  }, [noteList]);

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

  //   Add Documents Upload doc start

  const [role, setRole] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <div className={Styles.ProjectCostPagePageTabsContainerTable}>
        <table>
          <thead>
            <tr>{headRow()}</tr>
          </thead>
          <tbody className={Styles.TableBody}>{tableData()}</tbody>
        </table>
        <div className={Styles.ProjectCostPagePageTablePagination}>
          <Pagination
            pageSize={countPerPage}
            onChange={updatePage}
            current={currentPage}
            total={allData.length}
          />
        </div>
      </div>

      <Modal
        open={openNewProjectCost}
        onClose={handleCloseNewProjectCost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div
            className={
              Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer
            }
          >
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">Notes</p>
              <CloseOutlinedIcon
                onClick={() => handleCloseNewProjectCost()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
              <div
                className={
                  Styles.CreateProjetsdetailsAddPartysProjectTitleContainer
                }
              >
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
                      inputProps={{ maxLength: 50 }}
                      value={notesIdList?.data.notetitle}
                      name="notetitle"
                      onChange={(e) => setEditNotes({ ...editNotes, notetitle: e.target.value })}
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
                      inputProps={{ maxLength: 50000 }}
                      name="notedescription"
                      multiline
                      rows={4}
                      onChange={(e) => setEditNotes({ ...editNotes, notedescription: e.target.value })}                    />
                  
                      </div>
                  </div>
                  </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={
                  Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton
                }
                onClick={() => handleCloseNewProjectCost()}
              >
                Cancel
              </button>
              <button
                className={
                  Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton
                }
                onClick={() => handleEditProjectCost()}
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openViewProjectCost}
        onClose={handleCloseViewDistribution}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div
            className={
              Styles.ProjectsDetailsPageAddPartysProjectModelPopupContainer
            }
          >
            <div className="ModelPopupHeader">
              <p className="ModelPopupHeaderText">View Notes</p>
              <CloseOutlinedIcon
                onClick={() => handleCloseViewDistribution()}
                className="ModelPopupHeaderIcon"
              />
            </div>
            <div className="ModelPopupbody">
              <div
                className={
                  Styles.CreateProjetsdetailsAddPartysProjectTitleContainer
                }
              >
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
                      inputProps={{ maxLength: 50 }}
                      name="notetitle"
                      // onChange={(e) => setAddNewNotes({ ...addNewNotes, notetitle: e.target.value })}
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
                      inputProps={{ maxLength: 50000 }}
                      name="notedescription"
                      multiline
                      rows={4}
                      // onChange={(e) => setAddNewNotes({ ...addNewNotes, notedescription: e.target.value })}                    />
                   />
                      </div>
                  </div>
                  </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className={
                  Styles.CreateProjectDetailsInvestorTableAddPartsProjectsCancelButton
                }
                onClick={() => handleCloseViewDistribution()}
              >
                Cancel
              </button>
              <button
                className={
                  Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton
                }
                onClick={() => handleCloseViewDistribution()}
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
                      <div className={Styles.projectCostPageModelPopupContainer}>
                        <div className="ModelPopupHeader">
                          <p className="ModelPopupHeaderText">Delete Project Cost</p>
                          <CloseOutlinedIcon
                            onClick={() => handlesetDeleteConfimationModelClose()}
                            className="ModelPopupHeaderIcon"
                          />
                        </div>
                        <div className="ModelPopupbody">
                          <p
                            className={Styles.projectCostPageModelPopupContainerDeteleText}
                          >
                            Do you really want to remove this Project Cost :{" "}
                            <span
                              className={
                                Styles.projectCostPageModelPopupContainerDeteleTextProducerName
                              }
                            >
                             {projectCostById?.data?.costdescription}
                            </span> 
                          </p>
                        </div>
                        <div className="ModelPopupfooter">
                          <button
                            className="CancelButton"
                            onClick={() => handlesetDeleteConfimationModelClose()}
                          >
                            No !
                          </button>
                          <button
                            className="SubmitButton"
                            // onClick={() => handleDeleteEdit()}
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
export default NotesPage;
