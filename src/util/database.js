//import { TimeOutSec } from "./Time-Out";

//import { useEffect } from "react";

/*
export const User = async () => {
  let userObj = localStorage.getItem("user");
  
  //let timeout = TimeOutSec(5);
  let promiseUser = new Promise((resolve) => {
    const data = JSON.parse(userObj);
    resolve(data);
  });
  
  //const promises = await Promise.race([promiseUser]);
  if (!userObj) return null;
  return promiseUser;
};
*/
const User = async () => {
  let user = null;

  let userObj = localStorage.getItem("user");
  user = await new Promise((res) => {
    res(JSON.parse(userObj));
  });
  if (!user) return null;
  return { user };
};
export default User;
