import cls from "./ReceiverAccount.module.css";
import Modal from "../Helper/Modal";
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
const Receivers = ({ close }) => {
  const { data } = useOutletContext();
  const { users, user } = data;

  const [searchName, setSearchName] = useState("");
  const otherAccount = users.filter(
    (otheruser) => otheruser.id !== user.id && otheruser.status
  );
  const [accountList, setList] = useState(otherAccount);
  const closedModal = () => {
    close();
  };

  const searchUser = (val) => {
    const p = setList((p) => p);

    if (val === "") {
      setList(otherAccount);
    }
    if (searchName !== "") {
      setList(
        users.filter(
          (u) =>
            u.name.toLowerCase().startsWith(searchName) &&
            u.id !== user.id &&
            u.status
        )
      );
    }
    if (accountList.length < 1 && p.length < 1) {
      setList([]);
    }
  };
  return (
    <Modal className={cls.account__Body}>
      <h1>Beneficiaries</h1>
      <input
        placeholder="Search User.."
        className={cls.searchQuery}
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
          searchUser(e.target.value);
        }}
      />
      {accountList.map((otheruser) => (
        <li className={cls.acc} key={otheruser.id}>
          <button onClick={closedModal}>
            <Link to={`?receiver=${otheruser.docID}&from=${user.docID}`}>
              {otheruser?.firstName
                ? `${otheruser.firstName} ${otheruser.lastName}`
                : otheruser.name}
            </Link>
            <p>User ID: {otheruser.name}</p>
            <p>Account ID: {otheruser.docID}</p>
          </button>
        </li>
      ))}
      {accountList.length < 1 && <p>No User Found</p>}
      <button className={cls.closeBtn} onClick={closedModal}>
        Close
      </button>
    </Modal>
  );
};
export default Receivers;
