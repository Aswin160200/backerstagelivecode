import React, { useEffect, useState } from 'react'
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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { getProjectByCoProducers } from '../../../../../redux/Action';

const CoProducersTable=()=>{

  
      let dispatch = useDispatch();
    const theme = useTheme();
    const { projectid } = useParams();

     const projectIdcoproducersList = useSelector(
          (state) => state.projects.getprojectsBycoProducersId
        );
    
         useEffect(() => {
          dispatch(getProjectByCoProducers(projectid));
        }, [projectid]);
        
          const [allData, setAllData] = useState([]);
        
  

  const tableHead = {
    no:"No",
    name: "Name",
    emailID: "EmailID",
    viewInvestors: "View Investors",
    action: "Actions",
  };
  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  useEffect(() => {
      if (projectIdcoproducersList?.data) {
        const mappedData = projectIdcoproducersList.data?.map((item, index) => ({
          no: index + 1,
          name: `${item.firstname}${item.lastname}`,
          emailID: item.emailid,
          viewInvestors: <Link to={`/investors_details/:${item.investorid}`} className={Styles.LinkAddress} >View</Link>,
          action: (
                    <div className="TableActionContainer">
                    <DeleteOutlineOutlinedIcon
                      className="TableActionDeleteIcon"
                     />
                  </div>
                ),
        }));
        setAllData(mappedData);
        setCollection(cloneDeep(mappedData.slice(0, countPerPage)));
      }
    }, [projectIdcoproducersList]);


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
        <div>

<div className={Styles.CoProducersTablePageTabsContainerTable}>
          <table>
            <thead>
              <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover">{tableData()}</tbody>
          </table>
          <div className={Styles.CoProducersTablePageTablePagination}>
            <Pagination
              pageSize={countPerPage}
              onChange={updatePage}
              current={currentPage}
              total={allData.length}
            />
          </div>
        </div>
        </div>
    )
}
export default CoProducersTable