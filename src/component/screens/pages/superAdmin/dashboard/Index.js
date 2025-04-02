import React, { useEffect } from "react";
import SuperAdminHeaderPage from "../superAdminHeader/Index";
import Styles from "./Index.module.css";
import MasterAdminHandImage from "../../../../assets/images/MasterAdminHandImage.png";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TotalProducers from "../../../../assets/images/TotalProducers.png";
import ActiveProducers from "../../../../assets/images/ActiveProducers.png";
import InactiveProducers from "../../../../assets/images/InactiveProducers.png";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import ProducersImageAdminView from "../../../../assets/images/ProducersImageAdminView.png";
import SubscriptionIcon from "../../../../assets/images/SubscriptionIcon.png";
import InvestorsImage from "../../../../assets/images/InvestorImageAdmin.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { getAllUsers } from "../../../../redux/Action";

const SuperAdminDashboard = () => {
  let dispatch = useDispatch();

   const userList = useSelector((state) => state.users.getAllUsersSuccessfull);


   useEffect(() => {
    dispatch(getAllUsers());
   
  }, [dispatch]);


  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${formattedDate.replace(",", "")}, ${hours}:${minutes}${ampm}`;
  };



  const data = [
    { month: "Jan", value: 30, max: 100 },
    { month: "Feb", value: 50, max: 100 },
    { month: "Mar", value: 60, max: 100 },
    { month: "Apr", value: 80, max: 100 },
    { month: "May", value: 40, max: 100 },
    { month: "Jun", value: 70, max: 100 },
  ];
  return (
    <div className={Styles.SuperAdminDashboardMainContainer}>
      <SuperAdminHeaderPage />
      <div className={Styles.SuperAdminDashboard}>
        <div className={Styles.SuperAdminDashboardNavContainer}>
          <div className={Styles.SuperAdminDashboardNavContainerNameCard}>
            <p className={Styles.SuperAdminDashboardNameCardTextOne}>
              Welcome Back!{" "}
              <img
                src={MasterAdminHandImage}
                alt=""
                className={Styles.SuperAdminDashboardNameCardImg}
              />
            </p>
            <p className={Styles.SuperAdminDashboardNameCardTextTwo}>
            Administrator!
            </p>
          </div>
            <p className={Styles.AdminPageDateFormat}>{formatDate(new Date())}</p>
        </div>

        <div className={Styles.SuperAdminDashboardCardContainer}>
          <div className={Styles.SuperAdminDashboardCard}>
            <img
              src={TotalProducers}
              alt="TotalProducers"
              className={Styles.SuperAdminDashboardCardImage}
            />
            <div className={Styles.SuperAdminDashboardCardContent}>
              <p className={Styles.SuperAdminDashboardCardContentTitle}>
                Total Producers
              </p>
              <p
                className={Styles.SuperAdminDashboardCardContentProducersCount}
              >
                {userList.length} Producers
              </p>
            </div>
          </div>
          <div className={Styles.SuperAdminDashboardCard}>
            <img
              src={ActiveProducers}
              alt="ActiveProducers"
              className={Styles.SuperAdminDashboardCardImage}
            />
            <div className={Styles.SuperAdminDashboardCardContent}>
              <p className={Styles.SuperAdminDashboardCardContentTitle}>
                Active Producers
              </p>
              <p
                className={Styles.SuperAdminDashboardCardContentProducersCount}
              >
                 {userList.length} Producers
              </p>
            </div>
          </div>
          <div className={Styles.SuperAdminDashboardCard}>
            <img
              src={InactiveProducers}
              alt="InactiveProducers"
              className={Styles.SuperAdminDashboardCardImage}
            />
            <div className={Styles.SuperAdminDashboardCardContent}>
              <p className={Styles.SuperAdminDashboardCardContentTitle}>
                Inactive Producers
              </p>
              <p
                className={Styles.SuperAdminDashboardCardContentProducersCount}
              >
                0 Producers
              </p>
            </div>
          </div>
          <div className={Styles.SuperAdminDashboardCardGraph}>
            <div className={Styles.SuperAdminDashboardCardGraphDetails}>
              <div>
                <p className={Styles.SuperAdminDashboardCardContentTitle}>
                  $20,425
                </p>
                <p
                  className={
                    Styles.SuperAdminDashboardCardContentProducersCountTag
                  }
                >
                  +3.8%
                </p>
              </div>
              <div className={Styles.SuperAdminDashboardCardContent}>
                <p className={Styles.SuperAdminDashboardCardContentTitle}>
                  Subscriptions
                </p>
                <p
                  className={
                    Styles.SuperAdminDashboardCardContentProducersCount
                  }
                >
                  Past 6 months
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={150}>
              <BarChart
                data={data}
                barCategoryGap={10}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#999", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar
                  dataKey="max"
                  fill="#002D6D"
                  barSize={10}
                //   radius={[5, 5, 0, 0]}
                  stackId="a"
                />
                <Bar
                  dataKey="value"
                  fill="#999"
                  barSize={10}
                  radius={[5, 5, 0, 0]}
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          
        </div>

        <div  className={Styles.SuperAdminDashboardProducersAndAsubscription}>
                 <Link to="/producers" className="LinkCard"><p  className={Styles.SuperAdminDashboardProducersAndAsubscriptionCard}><img src={ProducersImageAdminView} alt="ProducersImageAdminView"/> Producers</p></Link>                 
                 <Link to="/subscription" className="LinkCard"> <p  className={Styles.SuperAdminDashboardProducersAndAsubscriptionCard}><img src={SubscriptionIcon} alt="SubscriptionIcon"/> Subscription</p></Link>
                 <Link to="/admin_investor" className="LinkCard"> <p  className={Styles.SuperAdminDashboardProducersAndAsubscriptionCard}><img src={InvestorsImage} alt="InvestorsIcon"/> Investors</p></Link>
        </div>
      </div>
    </div>
  );
};
export default SuperAdminDashboard;
