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
import { createDocumetsFiles, getProjectsByID } from "../../../../../redux/Action";

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

const DcoumentsPage = () => {
  let dispatch = useDispatch();
  const { projectid } = useParams();

  const projectIdList = useSelector(
    (state) => state.projects.getProjectByIdSuccessfull
  );

  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));


  useEffect(() => {
    dispatch(getProjectsByID(projectid));
  }, [projectid]);

  const [allData, setAllData] = useState([]);

  const [createDocuments, setDreateDocuments]=useState(
    
      {
        projectid: projectid,
        investorid:"",
        producersid: storedUser.userid,
        filename:"",
        filetype: "",
        choosefile:"",
        filedata:"",
      }   
  )

  const tableHead = {
    fileName: "File Name",
    createddate: "Created Date",
    updatedOn: "Updated On",
    reletedTo: "Releted To",
    parentFlow: "Parent fol...",
    action: "Actions",
    generate: "",
  };
  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  useEffect(() => {
    if (projectIdList?.data && Array.isArray(projectIdList.data)) {
      const mappedData = projectIdList.data.map((item, index) => ({
        no: index + 1,
        fileName: item.uploadeddocument,
        createddate: item.startdate,
        updatedOn: item.updateddate,
        reletedTo: item.projectname,
        parentFlow: item.projectname,
        action: (
          <div className="TableActionContainer">
            <EditOutlinedIcon className="TableActionEditIcon" />
            <SaveAltOutlinedIcon className="TableActionViewIcon" />
            <DeleteOutlineOutlinedIcon className="TableActionDeleteIcon" />
          </div>
        ),
        generate: (
          <button
            className={Styles.DcoumentsPageGenerateButton}
            onClick={() => handlecOpenWaterMarkDoc()}
          >
            Generate
          </button>
        ),
      }));

      setAllData(mappedData);
      setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
    } else {
      console.error("projectIdList.data is not an array", projectIdList?.data);
    }
  }, [projectIdList]);

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
  const [openDocumentUpload, setOpenDocumentUpload] = useState(false);
  const handleOpenDocumentUpload = () => setOpenDocumentUpload(true);
  const handleCloseDocumentUpload = () => setOpenDocumentUpload(false);
  //   end Documents Upload doc start

  //   Add Documents Upload doc start
  const [openWaterMarkDoc, setOpenWaterMarkDoc] = useState(false);
  const handlecOpenWaterMarkDoc = () => setOpenWaterMarkDoc(true);
  const handleCloseWaterMarkDoc = () => setOpenWaterMarkDoc(false);
  //   end Documents Upload doc start

  const [role, setRole] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  // const handleCreateDocumentUpload = () => {
  
  //   dispatch(createDocumetsFiles(createDocuments));
    
  // }

  const handleCreateDocumentUpload = () => {
    const formData = new FormData();
    formData.append("projectid", createDocuments.projectid);
    formData.append("investorid", createDocuments.investorid);
    formData.append("producersid", createDocuments.producersid);
    formData.append("filename", createDocuments.filename);
    formData.append("filetype", createDocuments.filetype);
    formData.append("choosefile", createDocuments.choosefile);
    formData.append("file", createDocuments.filedata); // the actual file upload
  
    dispatch(createDocumetsFiles(formData));
    handleCloseDocumentUpload();
  };


  return (
    <div>
      <div className={Styles.DcoumentsPagePageTabsContainerTable}>
        <div className={Styles.DcoumentsPagePageTableNavContent}>
          <div className="Search">
            <input
              placeholder="Search Campaign"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            className={Styles.DcoumentsPagePageTableNavContentButton}
            onClick={() => handleOpenDocumentUpload()}
          >
            Upload Document
          </button>
        </div>
        {/* <p className={Styles.DcoumentsPageTableTitleText}>Project Home</p> */}
        <table>
          <thead>
            <tr>{headRow()}</tr>
          </thead>
          <tbody className={Styles.TableBody}>{tableData()}</tbody>
        </table>
        <div className={Styles.DcoumentsPagePageTablePagination}>
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
        onClose={handleCloseDocumentUpload}
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
              <p className="ModelPopupHeaderText">Upload</p>
              <CloseOutlinedIcon
                onClick={() => handleCloseDocumentUpload()}
                className="ModelPopupHeaderIcon"
              />
            </div>

            <div className="ModelPopupbody">
              <div
                className={
                  Styles.CreateProjetsdetailsAddPartysProjectTitleContainer
                }
              >
                <p className="ModalInnerTitle">Upload Summary</p>
                {/* <p className="ModalInnerText">
                  You are going To Upload The File Named {projectIdList.data?.uploadeddocument}
                </p> */}
              </div>
              <div className="InputContainer">
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">File Name</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 20 }}
                      name="firstname"
                      onChange={(e) => setDreateDocuments({ ...createDocuments, filename: e.target.value })}
                    />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                    <p className="InputCartText">Document Category</p>
                    
                    <select
                        className="SearchSelectFilter"
                        value={createDocuments.choosefile || "None"}
                        // onChange={(e) =>
                        //   setAddPartysProject({ ...addPartysProject, investorid: e.target.value })
                        // }
                        onChange={(e) => setDreateDocuments({ ...createDocuments, choosefile: e.target.value })}

                      >
                        <option value="None">-None-</option>
                        <option value="Agreements">Agreements</option>
                        <option value="Completed Documents">Completed Documents</option>
                        <option value="Financials">Financials</option>
                       
                      </select>

                    <p className={Styles.CreateProjectsInputCartText}>
                      Upload OA & Subscription Documents as one file
                    </p>
                    <div className="file_input">
                      {/* <InputStyled
                        id="outlined-basic"
                        type="file"
                        className=""
                        inputProps={{ maxLength: 50 }}
                        name="uploadeddocument"
                        onChange={(e) => setDreateDocuments({ ...createDocuments, filedata: e.target.value })}

                      /> */}
                      <InputStyled
                        id="outlined-basic"
                        type="file"
                        inputProps={{ maxLength: 50 }}
                        name="uploadeddocument"
                        onChange={(e) => setDreateDocuments({ ...createDocuments, filedata: e.target.files[0] })}
                      />
                    </div>
                  </div>
                  <div className="InputCart">
                    <p className="InputCartText">Description</p>

                    <InputStyled
                      id="outlined-basic"
                      className={Styles.LoginPageInputContainerInput}
                      inputProps={{ maxLength: 200 }}
                      name="lastname"
                      multiline
                      rows={4}

                      onChange={(e) => setDreateDocuments({ ...createDocuments, filetype: e.target.value })}
                      />
                    {/* {error?.username && (
              <span className={Styles.registerErrormsg}>{error?.username}</span>
            )} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className="CancelButton"
                onClick={() => handleCloseDocumentUpload()}
              >
                Cancel
              </button>
              <button
                className="SubmitButton"
                onClick={() => handleCreateDocumentUpload()}
              >
                Upload
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openWaterMarkDoc}
        onClose={handleCloseWaterMarkDoc}
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
              <p className="ModelPopupHeaderText">
                Generate Watermarked Document
              </p>
              <CloseOutlinedIcon
                onClick={() => handleCloseWaterMarkDoc()}
                className="ModelPopupHeaderIcon"
              />
            </div>

            <div className="ModelPopupbody">
              <div
                className={
                  Styles.CreateProjetsdetailsAddPartysProjectTitleContainer
                }
              >
                <p className="ModalInnerText">
                  You are going To Generate The File Named "ABC Project
                  Agreement2.652.pdf"
                </p>
              </div>
              <div className="InputContainer">
                <div className="InputContent">
                  <div className="InputCart">
                    <p className="InputCartText">File Name</p>

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
                    <p className="InputCartText">Select Investor</p>

                    <SelectStyled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      onChange={handleChangeRole}
                    >
                      <MenuItem value={10}>-None-</MenuItem>
                      <MenuItem value={20}>Mathew</MenuItem>
                      <MenuItem value={30}>Mathew</MenuItem>
                      <MenuItem value={40}>Mathew</MenuItem>
                    </SelectStyled>
                  </div>
                </div>
              </div>
            </div>
            <div className="ModelPopupfooter">
              <button
                className="CancelButton"
                onClick={() => handleCloseWaterMarkDoc()}
              >
                Cancel
              </button>
              <button
                className="SubmitButton"
                onClick={() => handleCloseWaterMarkDoc()}
              >
                Upload
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default DcoumentsPage;
