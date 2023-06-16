import cls from "./HomeRoot.module.css";
import Card from "../Helper/Card";
import TransactionList from "./TransactionList";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Viewport from "../hook/ViewPort";
const Home = () => {
  const { data } = useOutletContext();
  const { user } = data;

  const d = localStorage.getItem("auth-token");
  const token = JSON.parse(d);

  useEffect(() => {
    if (user.name === "") {
      toast.info(`logged in as ${token.email}`);
    }
  }, [user.name, token]);

  const [withdrawal, setWithdraw] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [bal, setbal] = useState(0);

  useEffect(() => {
    const balCalc = () => {
      let currentBal = user.transactions
        .map((val) => Number(val.amount))
        .reduce((acc, val) => acc + val, 0);
      // console.log(currentBal);
      setbal(currentBal);
    };
    const withDraw = () => {
      let currentWithdraw = user.transactions
        .map((val) => Number(val.amount))
        .filter((val) => val < 1)
        .reduce((acc, val) => acc + val, 0);
      setWithdraw(Math.abs(currentWithdraw));
    };

    const deposit = () => {
      let currentDeposit = user.transactions
        .map((val) => Number(val.amount))
        .filter((val) => val > 1)
        .reduce((acc, val) => acc + val, 0);

      setDeposit(currentDeposit);
    };

    balCalc();
    deposit();
    withDraw();
  }, [user]);
  const detail = (
    <>
      <p>
        Account Owner:
        <span>{user.name}</span>
      </p>
      <p>
        Balance: <span>${bal}</span>
      </p>
      <p>
        Withdrawn: <span>${withdrawal}</span>
      </p>
      <p>
        Deposited: <span>${deposit}</span>
      </p>
    </>
  );
  const { phoneViewport } = Viewport();
  const detailBlock = !phoneViewport
    ? `${cls.homeDetail__body}`
    : `${cls.homeDetail__body} ${cls.homeDetail__block}`;
  return (
    <Card className={cls.main}>
      <ToastContainer />
      <div className={cls.homeDetail}>
        <h2>Account Detail</h2>
        <div className={detailBlock}>{detail}</div>
      </div>
      <TransactionList />
    </Card>
  );
};
export default Home;
