import config from "../config/Config.json";
import axios from "axios";
// import { SecurityService } from "./EncryptDecrypt";

// const commonFetch = async (url, Method, bodyData, headerData, paramsData) => {

//   const URL = config.BASE_URL + url;

//   let paramsHeader = {};

// //   if (headerData === true) {
 
//     // paramsHeader = {
//     //   Authorization: "",
//     // };
  

// //   const encryptData = (type, data) => {
// //     let ed = {
// //       EncryptData: "" + SecurityService.Encryption(JSON.stringify(data)) + "",
// //     };

// //     console.log(ed);

// //     if (type == "body") return JSON.stringify(ed);

// //     if (type == "query") return ed;
// //   };

//   let headerComponent = {
//     method: Method,
//     url: URL,
//     headers: {
//       "Content-Type": "application/json",
//       Host: window.location.host,
//       Accept: "*/*",
//       Connection: "keep-alive",
//       ...paramsHeader,
//     },
//     data: bodyData ,
//     params: paramsData ,
//   };

//   let result;

//   console.log(result);

//   await axios(headerComponent)
//     .then((res) => (result = res.data))
//     .catch(
//       (err) =>
//         (result = err.response.data)
//     );
   

//   return result;
// };

// export const Service = {
//   commonFetch,
// };


const commonFetch = async (url, Method, bodyData, headerData, paramsData) => {
  const URL = config.BASE_URL + url;

  let paramsHeader = {};


  const headerComponent = {
    method: Method,
    url: URL,
    headers: {
      "Content-Type": "application/json",
      Host: window.location.host,
      Accept: "*/*",
      Connection: "keep-alive",
      ...paramsHeader,
    },
  };


  if (["POST", "PUT", "PATCH"].includes(Method.toUpperCase()) && bodyData) {
    headerComponent.data = bodyData;
  }

  if (paramsData) {
    headerComponent.params = paramsData;
  }

  let result;

  await axios(headerComponent)
    .then((res) => (result = res.data))
    .catch((err) => (result = err.response?.data || { message: "Network error" }));

  return result;
};

export const Service = {
  commonFetch,
};