import { redirect } from "react-router-dom";
import Tranfer from "../Component/Transfer";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-db";
const TransferPage = () => {
  return (
    <>
      <Tranfer />
    </>
  );
};
export default TransferPage;

export const TransferAction = async ({ request }) => {
  const searchParam = new URL(request.url).searchParams;
  const receiver = searchParam.get("receiver");
  const sender = searchParam.get("from");

  const data = await request.formData();
  console.log(data.get("trans"));
  const userData = {
    from: sender,
    pin: data.get("pin"),
    amount: data.get("amount"),
    to: receiver,
  };
  /*
  let arr = "tea"
  const docRef = doc(db, "Slotin", userData.to);
  const info = {
    transactions: [{ from: userData.from, amount: userData.amount }],
  };
  updateDoc(docRef, info)
    .then(console.log((doc) => console.log(doc)))
    .catch((err) => console.log(err));
*/
  return null;
};
