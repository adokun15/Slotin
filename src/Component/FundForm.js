import cls from "./links.module.css";
import Button from "../Helper/Button";
import Card from "../Helper/Card";
import Input from "../Helper/Input";
import Maincls from "./HomeRoot.module.css";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-db";
import { ToastContainer, toast } from "react-toastify";
const Fund = () => {
  const { data } = useOutletContext();
  const { user } = data;

  const [bal, setbal] = useState(0);
  //const [fundAmt] = useState();

  useEffect(() => {
    const balCalc = () => {
      let currentBal = user.transactions
        .map((val) => Number(val.amount))
        .reduce((acc, val) => acc + val, 0);
      // console.log(currentBal);
      setbal(currentBal);
    };
    balCalc();
  });
  const [receiver] = useSearchParams();
  const currentReceiver = receiver.get("receiver");
  const currentSender = receiver.get("from");
  const [pin, setPin] = useState("");
  const [amt, setAmt] = useState(0);

  const userData = {
    from: currentSender,
    pin,
    amt,
    to: currentReceiver,
  };

  const amtHandler = (objTime) => {
    const TransTime = new Date(objTime);
    const f = user.transactions.find(function (u) {
      const d = new Date(u.delivery);
      //if(!(u.id.endsWith("fundLoan")) || !(TransTime.getDate() === d.getDate())) return false

      return u.id.endsWith("fundLoan") && TransTime.getDate() === d.getDate()
        ? true
        : false;
    });
    return f;
  };

  const fundHandler = (e) => {
    e.preventDefault();
    let idNum;
    idNum = Math.trunc(Math.random() * 100000000);
    const id = `slotin-${idNum}`;
    let timeSent = new Date();

    //(timeSent.toISOString());
    if (amt > 5000) {
      toast.error("Amount exceed Daily Limit");
      return;
    }

    if (user.pin !== pin) {
      toast.error("Wrong pin");
      setPin("");
      return;
    }
    if (amtHandler(timeSent.toISOString())) {
      toast.error("You can only fund your account Once A day");
      return;
    }

    let trans = [
      {
        id: `${id}-fundLoan`,
        delivery: timeSent.toISOString(),
        amount: userData.amt,
        from: "fund Wallet",
      },

      ...user.transactions,
    ];

    //receiver
    const docRef = doc(db, "Slotin", user.docID);
    const info = {
      transactions: trans,
    };
    updateDoc(docRef, info);
    setPin("");
    setAmt(0);
    toast.success(`$${userData.amt} has been added to your Balance`);
  };
  return (
    <Card className={`${Maincls.main} ${cls.Transfer__Container}`}>
      <ToastContainer />
      <div className={cls.Trans__detail}>
        <h1>
          Owner: <span>{user.name}</span>
        </h1>

        <h2>Balance: ${bal}</h2>
      </div>
      <form method="post" className={cls.trans__form} onSubmit={fundHandler}>
        <h3>Fund your Account: </h3>
        <p style={{ color: "red", fontSize: "0.8rem" }}>
          Max Amount per Day: $5000
        </p>
        <label>Amount:</label>
        <Input
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          name="amount"
          className={cls.trans__input}
          type="number"
        />
        <label>PIN:</label>
        <Input
          name="pin"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className={cls.trans__input}
          type="number"
        />
        <Button className={cls.trans__btn}>fund</Button>
      </form>
    </Card>
  );
};
export default Fund;
