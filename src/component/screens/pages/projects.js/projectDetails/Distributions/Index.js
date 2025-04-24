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
  deleteDistribution,
    editByDistributionId,
  getAllDistributions,
  getByDistributionId,
  getByProducersId,
  getProjectByProducerId,
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

const DistributionsPage = () => {
  let dispatch = useDispatch();
  const { projectid } = useParams();
  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const projectList = useSelector(
    (state) => state.projects.getProjectbyProducerId
  );

   const projectIdList = useSelector(
        (state) => state.projects.getProjectByIdSuccessfull
      );

  const DistributionByProducer = useSelector(
    (state) => state.distributions.getByProducersIdSuccessfull
  );

  const distributionById = useSelector(
    (state) => state.distributions.getByDistributionIdSuccessfull
  );

  useEffect(() => {
    dispatch(getByProducersId(projectid));
    dispatch(getProjectByProducerId(storedUser.userid));
    dispatch(getProjectsByID(projectid));
  }, []);

  const [allData, setAllData] = useState([]);
  const [updateID, setupdateID] = useState();

  const [editDistribution, setEditDistribution] = useState({
    projectid: projectid,
    producersid: storedUser.userid,
    distributionname: distributionById?.data?.distributionname,
    distributionnumber: distributionById?.data?.distributionnumber,
    projectname:  distributionById?.data?.projectname,
    dateofdistribution:  distributionById?.data?.dateofdistribution,
    amountofdistribution:  distributionById?.data?.amountofdistribution,
    totalrecoupedtodate: distributionById?.data?.totalrecoupedtodate,
  });

  const [openDocumentUpload, setOpenDocumentUpload] = useState(false);
  const handleOpenEditDistribution = (id) => {
    setupdateID(id)
    dispatch(getByDistributionId(id));
    setOpenDocumentUpload(true);
  };
  const handleCloseEditDistribution = () => setOpenDocumentUpload(false);

  const handleEditDistribution = () => {
    dispatch(editByDistributionId({ id: updateID, data: editDistribution }))
    setOpenDocumentUpload(false)
    dispatch(getByProducersId(storedUser.userid));
};

const [deleteConfimationModelOpen, setDeleteConfimationModelOpen] =useState(false);
// start delete distribution
 const handlesetDeleteConfimationModelOpen = (id) => {
      setupdateID(id);
    setDeleteConfimationModelOpen(true);
    dispatch(getByDistributionId(id));
  };
  const handlesetDeleteConfimationModelClose = () =>{
    setDeleteConfimationModelOpen(false);
  }

// end delete distribtion
  //   end Documents Upload doc start

  //   view Distributions
  const [openViewDistributions, setOpenViewDistributions] = useState(false);
  const handleOpenViewDistribution = (id) => {
    dispatch(getByDistributionId(id));
    setOpenViewDistributions(true);

  };
  const handleCloseViewDistribution = () => setOpenViewDistributions(false);

  const  handleDeleteteDistrbution=()=>{
    // dispatch(deleteDistribution(updateID))
    setDeleteConfimationModelOpen(false);
  }
  const tableHead = {
    distributionname: "Distribution Name",
    projectname: "Project Name",
    dateofdistribution: "Distribution Date",
    amountofdistribution: "Amount of Distribution",
    totalrecoupedtodate: "Total Recouped Date",
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
      DistributionByProducer?.data &&
      Array.isArray(DistributionByProducer.data)
    ) {
      const mappedData = DistributionByProducer?.data.map((item, index) => ({
        no: index + 1,
        distributionname: item.distributionname,
        projectname: item.projectname,
        dateofdistribution: item.dateofdistribution,
        amountofdistribution: item.amountofdistribution,
        totalrecoupedtodate: item.totalrecoupedtodate,
        action: (
          <div className="TableActionContainer">
            <EditOutlinedIcon
              className="TableActionEditIcon"
              onClick={() => handleOpenEditDistribution(item.distributionid)}
            />
            <RemoveRedEyeOutlinedIcon
              className="TableActionViewIcon"
              onClick={() => handleOpenViewDistribution(item.distributionid)}
            />
            <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" 
            onClick={()=> handlesetDeleteConfimationModelOpen(item.distributionid)}/>
          </div>
        ),
      }));

      setAllData(mappedData);
      setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
    } else {
      console.error(
        "Distribution.data is not an array",
        DistributionByProducer?.data
      );
    }
  }, [DistributionByProducer]);



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
      <div className={Styles.DistributionsPagePageTabsContainerTable}>
        <table>
          <thead>
            <tr>{headRow()}</tr>
          </thead>
          <tbody className={Styles.TableBody}>{tableData()}</tbody>
        </table>
        <div className={Styles.DistributionsPagePageTablePagination}>
          <Pagination
            pageSize={countPerPage}
            onChange={updatePage}
            current={currentPage}
            total={allData.length}
          />
        </div>
      </div>

      <Modal
        open={openDocumentUpload}
        onClose={handleCloseEditDistribution}
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
              <p className="ModelPopupHeaderText">Edit Distribution</p>
              <CloseOutlinedIcon
                onClick={() => handleCloseEditDistribution()}
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
                    <p className="InputCartText">Distribution Name/Number</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      value={distributionById?.data?.distributionname}
                      name="distributionname"
                      onChange={(e) => setEditDistribution({ ...editDistribution, distributionname: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                    <p className="InputCartText">Date of Distribution</p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 50 }}
                      value={distributionById?.data?.dateofdistribution}
                      name="dateofdistribution"
                      onChange={(e) => setEditDistribution({ ...editDistribution, dateofdistribution: e.target.value })}
                    />
                    <p className="InputCartText">Total Recouped to Date</p>

                    <InputStyled
                      id="outlined-basic"
                      type="date"
                      className={Styles.LoginPageInputContainerInput}
                      value={distributionById?.data?.totalrecoupedtodate}
                      name="totalrecoupedtodate"
                      onChange={(e) => setEditDistribution({ ...editDistribution, totalrecoupedtodate: e.target.value })}
                    />
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Project</p>

                    <InputStyled
                      id="outlined-basic"
                       type="text"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      value={projectIdList.data?.projectname}
                      name="firstname"
                      onChange={(e) => setEditDistribution({ ...editDistribution, projectname: e.target.value })}
                    />
                   
                    <p className="InputCartText">Amount of Destribution</p>

                    <InputStyled
                      id="outlined-basic"
                      type="text"
                      className={Styles.LoginPageInputContainerInput}
                      value={
                        distributionById?.data?.amountofdistribution
                      }
                      inputProps={{ maxLength: 50 }}
                      name="amountofdistribution"
                      onChange={(e) => setEditDistribution({ ...editDistribution, amountofdistribution: e.target.value })}
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
                onClick={() => handleCloseEditDistribution()}
              >
                Cancel
              </button>
              <button
                className={
                  Styles.CreateProjectDetailsInvestorTableAddPartsProjectsSubmitButton
                }
                onClick={() => handleEditDistribution()}
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openViewDistributions}
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
              <p className="ModelPopupHeaderText">View Distribution</p>
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
                    <p className="InputCartText">Distribution Name/Number</p>

                    <p className="InputCartTextData">
                      {distributionById?.data?.distributionname}
                    </p>

                    <p className="InputCartText">Date of Distribution</p>
                    <p className="InputCartTextData">
                      {distributionById?.data?.dateofdistribution}
                    </p>

                    <p className="InputCartText">Total Recouped to Date</p>
                    <p className="InputCartTextData">
                      {distributionById?.data?.totalrecoupedtodate}
                    </p>
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Project</p>
                    <p className="InputCartTextData">
                      {distributionById?.data?.projectname}
                    </p>

                    <p className="InputCartText">Amount of Destribution</p>
                    <p className="InputCartTextData">
                      {distributionById?.data?.amountofdistribution}
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
                <div className={Styles.distributionPageModelPopupContainer}>
                  <div className="ModelPopupHeader">
                    <p className="ModelPopupHeaderText">Delete Distribution</p>
                    <CloseOutlinedIcon
                      onClick={() => handlesetDeleteConfimationModelClose()}
                      className="ModelPopupHeaderIcon"
                    />
                  </div>
                  <div className="ModelPopupbody">
                    <p
                      className={Styles.distributionPageModelPopupContainerDeteleText}
                    >
                      Do you really want to remove this distribution :{" "}
                      <span
                        className={
                          Styles.distributionPageModelPopupContainerDeteleTextProducerName
                        }
                      >
                       {distributionById?.data?.distributionname}
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
                      onClick={() => handleDeleteteDistrbution()}
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
export default DistributionsPage;
