import { useOutletContext, useSubmit } from "react-router-dom";
import Card from "../Helper/Card";

import Maincls from "./HomeRoot.module.css";
import cls from "./links.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-db";
const Info = () => {
  const { data } = useOutletContext();
  const { user } = data;

  const [nameState, setName] = useState(user.name);
  const [pinState, setPin] = useState(user.pin);

  const [toggleName, setToggleName] = useState(false);
  const [togglePin, setTogglePin] = useState(false);

  const creationDate = (ds = "") => {
    const n = new Date(ds);
    const day = String(n.getDate());
    const month = String(n.getMonth() + 1);
    const year = String(n.getFullYear());

    return ds
      ? `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
      : "";
  };
  const submit = useSubmit();
  const deleteDB = async () => {
    const docRef = doc(db, "Slotin", user.docID);

    deleteDoc(docRef).then(() =>
      alert("Your Account Has Been Deleted Successfully")
    );
    //  submit(null, { action: "/logout", method: "post" });
  };
  const updateDb = async (obj) => {
    if (user.name === "") return;
    const docRef = doc(db, "Slotin", user.docID);
    updateDoc(docRef, obj).catch((e) => alert(e.code));
  };

  const deleteHandler = async () => {
    if (user.name === "") return;
    const proceed = window.confirm(
      "Are you Sure, you want to delete your Account"
    );
    if (proceed) {
      toast("Deleting in Progress...");
      setTimeout(() => {
        deleteDB();
        //navigate("/type=signup");
        // localStorage.removeItem("auth-token");
        submit(null, { action: "/logout", method: "POST" });
      }, 5000);
    }
  };
  const openUpdateName = () => {
    setToggleName(true);
  };

  const saveUpdateName = async () => {
    if (user.name === "") return;
    if (nameState === user.name) {
      toast.error(`The Updated UserName is the Same as Previous UserName`);
      setToggleName(false);
    }
    if (nameState !== user.name) {
      await updateDb({ name: nameState });
      toast.success("UserName is SuccessFully Updated!!");
      setToggleName(false);
    }
  };

  const openUpdatePin = () => {
    setTogglePin(true);
  };

  const saveUpdatePin = async () => {
    if (user.name === "") return;
    if (pinState === user.pin) {
      toast.error(`The Updated Pin is the Same as Previous Pin`);
      setTogglePin(false);
    }

    if (pinState !== user.pin) {
      await updateDb({ pin: pinState });
      toast.success("Your Pin has been SuccessFully Updated!!");
      setTogglePin(false);
    }
  };

  const [bal, setbal] = useState(0);
  useEffect(() => {
    const balCalc = () => {
      let currentBal = user.transactions
        .map((val) => Number(val.amount))
        .reduce((acc, val) => acc + val, 0);
      // console.log(currentBal);
      setbal(currentBal);
    };
    balCalc();
  }, [user.transactions]);

  //const [toggle, setToggle] = useState(user.status);
  const statusHandler = () => {
    if (user.name === "") return;
    updateDb({ status: !user.status });

    if (user.status === true) {
      toast.success("Currently Inactive!");
    }
    if (user.status === false) toast.success("Currently Active!");
  };

  const activeColor = () => {
    return user.status ? "green" : "red";
  };
  return (
    <Card className={`${Maincls.main} ${cls.info}`}>
      <ToastContainer />
      <h1>Personal Information: {user.name}</h1>

      <div className={cls.info__container}>
        <h3>User Detail:</h3>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>

        {toggleName && (
          <>
            <input
              onChange={(e) => setName(e.target.value)}
              value={nameState}
              className={cls.info__username__input}
            />
            <button onClick={saveUpdateName}>Save</button>
          </>
        )}
        {!toggleName && (
          <button onClick={openUpdateName}>Update UserName:</button>
        )}
      </div>

      <div className={cls.info__container}>
        <h3>Account Detail</h3>
        {user.createdOn && (
          <p>Account Created On: {creationDate(user.createdOn)}</p>
        )}
        <p>Account Balance till Date: ${bal}</p>

        <button
          disabled={user.docID === "M6H4VnwOlrZXmszBfv81"}
          onClick={deleteHandler}
        >
          Delete Bank Account
        </button>
      </div>

      <div className={cls.info__container}>
        <h3>Security:</h3>
        <p>pin: ****</p>
        {togglePin && (
          <>
            <input
              value={pinState}
              onChange={(e) => setPin(e.target.value)}
              className={cls.info__username__input}
            />
            <button onClick={saveUpdatePin}>Save</button>
          </>
        )}
        {!togglePin && <button onClick={openUpdatePin}>Update pin</button>}
        <h3>Online Status: </h3>
        <p>
          <i>Allow Other Users Find you </i>
        </p>
        <p>
          Current Status:{" "}
          <span style={{ color: activeColor() }}>
            {" "}
            {user.status ? "Active" : "Inactive"}
          </span>
        </p>
        <button onClick={statusHandler}>{user.status ? "Off" : "On"}</button>
      </div>
      <div className={cls.info__container}>
        <h3>Developer Detail:</h3>
        <p>
          <i>&copy; Amos Daniel</i>
        </p>
      </div>
    </Card>
  );
};
export default Info;
