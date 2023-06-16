import { useOutletContext } from "react-router-dom";
import cls from "./TransactionList.module.css";
import Viewport from "../hook/ViewPort";
const TransactionList = () => {
  const { data } = useOutletContext();
  const { user, users } = data;

  const senderAcc = (id, str) => {
    const u = users.find((user) => user.docID === id);
    if (!str) return "";
    if (str.endsWith("withdrawal")) {
      return "Account Balance";
    }
    if (str.endsWith("fundLoan")) {
      return "Fund Wallet";
    }
    return u ? u.name : "";
  };

  const toDate = (ds) => {
    const date = new Date(ds);
    const day = date.getDate();

    return date
      ? `${String(day).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${date.getFullYear()}`
      : "";
  };
  const typeTran = (str) => {
    if (!str) return "";
    if (str.endsWith("withdrawal")) {
      return "red";
    }
    if (str.endsWith("fundLoan")) {
      return "rgb(240, 141, 12)";
    }
    if (str.endsWith("deposit")) {
      return "green";
    }
  };

  const toTime = (ds) => {
    const date = new Date(ds);
    const hour = date.getHours();
    const min = date.getMinutes();

    const t = date
      ? `${String(hour).padStart(2, "0")} : ${String(min).padStart(2, "0")}`
      : " ";

    return hour >= 12 && hour <= 23 ? `${t}PM` : `${t}AM`;
  };
  const { phoneViewport } = Viewport();
  const transCss = phoneViewport
    ? `${cls.TransactionList} ${cls.TransactionListDevice}`
    : `${cls.TransactionList}`;
  return (
    <div className={transCss}>
      <h2>Account Transaction </h2>
      <ul className={cls.lists}>
        {user &&
          user.transactions.map((item) => (
            <li key={item.id}>
              <h1 style={{ color: typeTran(item.id) }}>
                ${Math.abs(item.amount)}
              </h1>
              <p>
                {" "}
                {item.id} {!phoneViewport && `|| ${toDate(item.delivery)}`}
                {phoneViewport && <p> {toDate(item.delivery)}</p>}
              </p>
              <p>
                from : {senderAcc(item.from, item.id)} @ {toTime(item.delivery)}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default TransactionList;
