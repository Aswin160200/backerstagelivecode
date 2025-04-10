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
  getAllProjectCost,
  getByDistributionId,
  getByProducersId,
  getByProjectCostId,
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

const ProjectCostPage = () => {
  let dispatch = useDispatch();
  const { projectid } = useParams();
  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const projectList = useSelector(
    (state) => state.projects.getProjectbyProducerId
  );

  const ProjectCostList = useSelector(
    (state) => state.projectCost.getAllProjectCostData
  );
  const ProjectCostByProducer = useSelector(
    (state) => state.projectCost.getByProducersIdSuccessfull
  );

  const projectCostById = useSelector(
    (state) => state.projectCost.getByProjectCostIdSuccessfull
  );

  useEffect(() => {
    dispatch(getAllProjectCost(projectid));
    dispatch(getProjectCostByProducersId(storedUser.userid));
    dispatch(getProjectByProducerId(storedUser.userid));
  }, []);

  const [allData, setAllData] = useState([]);
  const [updateID, setupdateID] = useState();

  const [editProjectCost, setEditProjectCost] = useState({
    projectid: projectid,
    producersid: storedUser.userid,
    costdescription: projectCostById?.data?.costdescription,
    totalcost: projectCostById?.data?.totalcost,
    dateofcost: projectCostById?.data?.dateofcost,
    status: projectCostById?.data?.status,
    costincuredby: projectCostById?.data?.costincuredby,
    dateofreimbursement: projectCostById?.data?.dateofreimbursement,
    projectname: projectCostById?.data?.projectname,
    expensecomments: projectCostById?.data?.expensecomments,
  });

  //   Add New Project Cost start
  const [openNewProjectCost, setOpenNewProjectCost] = useState(false);
  const handleOpenNewProjectCost = (id) => {
    setupdateID(id);
    dispatch(getByProjectCostId(id));
    setOpenNewProjectCost(true);
  };
  const handleCloseNewProjectCost = () => setOpenNewProjectCost(false);

  const handleEditProjectCost = () => {
    dispatch(editByProjectCostId({ id: updateID, data: editProjectCost }));
    setOpenNewProjectCost(false);
    dispatch(getProjectCostByProducersId(storedUser.userid));
  };

  //   Add New Distribution end
  //   end Documents Upload doc start

  //   view ProjectCost
  const [openViewProjectCost, setOpenViewProjectCost] = useState(false);
  const handleOpenViewDistribution = (id) => {
    dispatch(getByProjectCostId(id));
    setOpenViewProjectCost(true);
  };
  const handleCloseViewDistribution = () => setOpenViewProjectCost(false);

  const tableHead = {
    costdescription: "Cost Description",
    totalcost: "Total Cost",
    dateofcost: "Date of Cost",
    status: "Status",
    projectname: "Project Name",
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
      ProjectCostList?.data &&
      Array.isArray(ProjectCostList.data)
    ) {
      const mappedData = ProjectCostList?.data.map((item, index) => ({
        no: index + 1,
        costdescription: item.costdescription,
        totalcost: item.totalcost,
        dateofcost: item.dateofcost,
        status: item.status,
        projectname: item.projectname,
        action: (
          <div className="TableActionContainer">
            <EditOutlinedIcon
              className="TableActionEditIcon"
              onClick={() => handleOpenNewProjectCost(item.projectcostid)}
            />
            <RemoveRedEyeOutlinedIcon
              className="TableActionViewIcon"
              onClick={() => handleOpenViewDistribution(item.projectcostid)}
            />
            <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" />
          </div>
        ),
      }));

      setAllData(mappedData);
      setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
    } else {
      console.error(
        "Distribution.data is not an array",
        ProjectCostList?.data
      );
    }
  }, [ProjectCostList]);

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
              <p className="ModelPopupHeaderText">Edit Project Cost</p>
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
                  Details
                </p>
              </div>
              <div className="InputContainer">
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">Cost Destribution</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 5000 }}
                      defaultValue={projectCostById?.data?.costdescription}
                      name="costdescription"
                      multiline
                      rows={4}
                      onChange={(e) =>
                        setEditProjectCost({
                          ...editProjectCost,
                          costdescription: e.target.value,
                        })
                      }
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Total Cost</p>

                    <InputStyled
                      id="outlined-basic"
                      type="text"
                      className={Styles.LoginPageInputContainerInput}
                      defaultValue={projectCostById?.data?.totalcost}
                      inputProps={{ maxLength: 50 }}
                      name="totalcost"
                      onChange={(e) =>
                        setEditProjectCost({
                          ...editProjectCost,
                          totalcost: e.target.value,
                        })
                      }
                    />
                    <p className="InputCartText">Date of Cast</p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      defaultValue={projectCostById?.data?.dateofcost}
                      inputProps={{ maxLength: 50 }}
                      name="dateofcost"
                      onChange={(e) =>
                        setEditProjectCost({
                          ...editProjectCost,
                          dateofcost: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div
                  className={
                    Styles.CreateProjetsdetailsAddPartysProjectTitleContainer
                  }
                >
                  <p
                    className={Styles.CreateProjetsdetailsAddPartysProjectTitle}
                  >
                    Additional Info
                  </p>
                </div>
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">Status</p>
                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={projectCostById?.data?.status}
                      onChange={(e) =>
                        setEditProjectCost({
                          ...editProjectCost,
                          status: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="None">-None-</MenuItem>
                      <MenuItem value="Unreimbursed">Unreimbursed</MenuItem>
                      <MenuItem value="Reimbursed">Reimbursed</MenuItem>
                    </SelectStyled>

                    <p className="InputCartText">Date of Reimbursement</p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      defaultValue={projectCostById?.data?.dateofreimbursement}
                      name="dateofreimbursement"
                      onChange={(e) =>
                        setEditProjectCost({
                          ...editProjectCost,
                          dateofreimbursement: e.target.value,
                        })
                      }
                    />
                    <p className="InputCartText">Expense Comments</p>

                    <InputStyled
                      id="outlined-basic"
                      type="text"
                      className={Styles.LoginPageInputContainerInput}
                      defaultValue={projectCostById?.data?.expensecomments}
                      inputProps={{ maxLength: 500000 }}
                      name="expensecomments"
                      multiline
                      rows={4}
                      onChange={(e) =>
                        setEditProjectCost({
                          ...editProjectCost,
                          expensecomments: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Cost Incurred By</p>
                    <InputStyled
                      id="outlined-basic"
                      type="search"
                      className={Styles.LoginPageInputContainerInput}
                      defaultValue={projectCostById?.data?.costincuredby}
                      inputProps={{ maxLength: 50 }}
                      name="costincuredby"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                      onChange={(e) =>
                        setEditProjectCost({
                          ...editProjectCost,
                          costincuredby: e.target.value,
                        })
                      }
                    />
                    <p className="InputCartText">Project</p>
                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={projectCostById?.data?.projectname}
                      onChange={(e) =>
                        setEditProjectCost({
                          ...editProjectCost,
                          projectname: e.target.value,
                        })
                      }
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                    >
                      <MenuItem value="-None-">-None-</MenuItem>
                      {Array.isArray(projectList?.data) &&
                      projectList?.data.length > 0 ? (
                        projectList?.data.map((project) => (
                          <MenuItem
                            key={project.projectname}
                            value={project.projectname}
                          >
                            {project.projectname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Projects Available</MenuItem>
                      )}
                    </SelectStyled>
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
              <p className="ModelPopupHeaderText">View Project Cost</p>
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
                  Details
                </p>
              </div>
              <div className="InputContainer">
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">Cost Destribution</p>
                    <p className="InputCartTextData">
                      {projectCostById?.data?.costdescription}
                    </p>
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Total Cost</p>
                    <p className="InputCartTextData">
                      {projectCostById?.data?.totalcost}
                    </p>

                    <p className="InputCartText">Date of Cast</p>
                    <p className="InputCartTextData">
                      {projectCostById?.data?.dateofcost}
                    </p>
                  </div>
                </div>
                <div
                  className={
                    Styles.CreateProjetsdetailsAddPartysProjectTitleContainer
                  }
                >
                  <p
                    className={Styles.CreateProjetsdetailsAddPartysProjectTitle}
                  >
                    Additional Info
                  </p>
                </div>
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">Status</p>
                    <p className="InputCartTextData">
                      {projectCostById?.data?.status}
                    </p>
                    <p className="InputCartTextData">
                      {projectCostById?.data?.dateofcost}
                    </p>

                    <p className="InputCartText">Date of Reimbursement</p>
                    <p className="InputCartTextData">
                      {projectCostById?.data?.dateofreimbursement}
                    </p>

                    <p className="InputCartText">Expense Comments</p>
                    <p className="InputCartTextData">
                      {projectCostById?.data?.expensecomments}
                    </p>
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Cost Incurred By</p>
                    <p className="InputCartTextData">
                      {projectCostById?.data?.costincuredby}
                    </p>

                    <p className="InputCartText">Project</p>
                    <p className="InputCartTextData">
                      {projectCostById?.data?.projectname}
                    </p>
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
    </div>
  );
};
export default ProjectCostPage;
