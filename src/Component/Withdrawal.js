import cls from "./links.module.css";
import Button from "../Helper/Button";
import Card from "../Helper/Card";
import Input from "../Helper/Input";
import Maincls from "./HomeRoot.module.css";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-db";
import { ToastContainer, toast } from "react-toastify";
const Withdrawal = () => {
  const { data } = useOutletContext();
  const { user } = data;
  const notify = (m) => toast.success(m);
  const [bal, setbal] = useState(0);
  const [pin, setPin] = useState("");
  const [amt, setAmt] = useState(0);

  useEffect(() => {
    const balCalc = () => {
      let currentBal = user.transactions
        .map((val) => Number(val.amount))
        .reduce((acc, val) => acc + val, 0);
      // console.log(currentBal);
      setbal(currentBal);
    };
    balCalc();
  }, [user]);
  const withDrawHandler = (e) => {
    e.preventDefault();
    //later insert id,timeCreated
    if (pin !== user.pin) {
      toast.error("Incorrect Pin");
      setPin("");
      return;
    }
    let idNum;
    idNum = Math.trunc(Math.random() * 100000000);
    const id = `slotin-${idNum}`;
    let timeSent = new Date();

    let withdraws = [
      {
        id: `${id}-withdrawal`,
        delivery: timeSent.toISOString(),
        amount: `${-amt}`,
      },
      ...user.transactions,
    ];

    const dbref = doc(db, "Slotin", user.docID);
    const info = { transactions: withdraws };

    updateDoc(dbref, info);
    setPin("");
    setAmt(0);
    notify(`$${amt} has been withdrawn from your Account Balance`);
  };
  return (
    <Card className={`${Maincls.main} ${cls.Transfer__Container}`}>
      <ToastContainer />
      <div className={cls.Trans__detail}>
        <h2>
          Owner: <span>{user.name}</span>
        </h2>
        <h2>Balance: ${bal}</h2>
      </div>

      <form onSubmit={withDrawHandler} className={cls.trans__form}>
        <h3>WithDraw your money</h3>
        <label>Amount:</label>
        <Input
          className={cls.trans__input}
          type="number"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
        />
        <label>Pin:</label>
        <Input
          className={cls.trans__input}
          type="number"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <Button
          disabled={user.docID === "M6H4VnwOlrZXmszBfv81"}
          className={cls.trans__btn}
        >
          withdraw
        </Button>
      </form>
    </Card>
  );
};

export default Withdrawal;
