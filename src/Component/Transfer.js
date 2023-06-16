import cls from "./links.module.css";
import Button from "../Helper/Button";
import Card from "../Helper/Card";
import Input from "../Helper/Input";
import Maincls from "./HomeRoot.module.css";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
//import Modal from "../Helper/Modal";
import Receivers from "./ReceiverAccount";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-db";
import { ToastContainer, toast } from "react-toastify";
const Tranfer = () => {
  const { data } = useOutletContext();
  const { user, users } = data;

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
  }, [user]);

  const [showModal, setModal] = useState(false);
  const modalHandler = (e) => {
    e.preventDefault();
    setModal(true);
  };
  const closeHandler = () => {
    setModal(false);
  };

  const [receiver] = useSearchParams();
  const currentReceiver = receiver.get("receiver");
  const currentSender = receiver.get("from");

  const receiverAccount = users.find(
    (otheruser) => otheruser.docID === currentReceiver
  );

  const [pin, setPin] = useState("");
  const [amt, setAmt] = useState(0);

  const userData = {
    from: currentSender,
    pin,
    amt,
    to: currentReceiver,
  };

  const transferHandler = (e) => {
    e.preventDefault();
    let idNum;
    idNum = Math.trunc(Math.random() * 100000000);
    const id = `slotin-${idNum}`;
    let timeSent = new Date();

    //(timeSent.toISOString());
    if (pin !== user.pin) {
      setPin("");
      toast("Wrong Pin");
      return;
    }
    let trans = [
      {
        id: `${id}-deposit`,
        delivery: timeSent.toISOString(),
        amount: userData.amt,
        from: userData.from,
      },

      ...receiverAccount.transactions,
    ];

    //receiver
    const docRef = doc(db, "Slotin", userData.to);
    const info = {
      transactions: trans,
    };
    updateDoc(docRef, info);

    //sender
    let senderTrans = [
      {
        id: `${id}-withdrawal`,
        delivery: timeSent.toISOString(),
        amount: `${-userData.amt}`,
      },
      ...user.transactions,
    ];
    const docSender = doc(db, "Slotin", user.docID);
    const senderinfo = {
      transactions: senderTrans,
    };
    updateDoc(docSender, senderinfo);

    //console.log(receiverAccount);
    //console.log(users);
    toast(`Transfer $${userData.amt} to ${receiverAccount.name}`);
    setAmt(0);
    setPin("");
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
      <form
        method="post"
        className={cls.trans__form}
        onSubmit={transferHandler}
      >
        <h3>Send money to other Accounts: </h3>
        {/*<button onClick={modalHandler} className={cls.transfer__form__accs}>
          Choose account to send to:
        </button>*/}

        <button onClick={modalHandler} className={cls.trans__btn}>
          {" "}
          Beneficiaries
        </button>
        <label>Account Name: </label>
        <Input
          value={receiverAccount?.name || ""}
          name="username"
          className={`${cls.trans__input} ${cls.transfer__to}`}
          type="text"
        />
        <label>amt:</label>
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
        <Button className={cls.trans__btn}>Send</Button>
      </form>

      {showModal && <Receivers close={closeHandler} />}
    </Card>
  );
};
export default Tranfer;
