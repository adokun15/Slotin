// eslint-disable-next-line no-unused-vars
import { app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AuthForm from "../Component/AuthForm";
import Nav from "../Component/NavBar";
import { redirect } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-db";
import { ToastContainer } from "react-toastify";
const Authenication = () => {
  return (
    <>
      <main>
        <Nav />
        <ToastContainer />
        <AuthForm />
      </main>
    </>
  );
};
export default Authenication;

export async function AuthAction({ request }) {
  const searchParam = new URL(request.url).searchParams;
  const mode = searchParam.get("type") || "signup";

  if (mode !== "login" && mode !== "signup") {
    throw new Error("Unsupported Authentication method");
  }
  const data = await request.formData();
  const date = new Date();

  const userData = {
    name: data.get("username"),
    fname: data.get("firstname"),
    lname: data.get("lastname"),
    email: data.get("email"),
    password: data.get("password"),
    pin: data.get("pin"),
    date: date.toISOString(),
    status: true,
  };
  let message = "";
  const errHandler = (err) => {
    let promise = new Promise((resolve, reject) => {
      resolve(err);
    });
    return promise;
  };

  if (userData.password.length === 0 && userData.email.length === 0) {
    message = `Empty fields (email & password)`;
    return errHandler(message);
  }

  if (userData.password.length === 0 || userData.email.length === 0) {
    message = `Empty ${userData.password.length ? "email" : "password"} field`;
    message = `Empty ${userData.email.length ? "password" : "email"} field`;
    return errHandler(message);
  }
  if (!userData.email.includes("@")) {
    message = "Email doesn't have @";
    return errHandler(message);
  }

  if (userData.password.length < 8) {
    message = "password too short. Length must be longer or equal to 8";
    return errHandler(message);
  }
  if (mode === "signup" && userData.pin.length !== 4) {
    message = "Pin must contain 4 digits";
    return errHandler(message);
  }
  if (mode === "signup" && userData.name === "") {
    message = "UserName field Empty";
    return errHandler(message);
  }
  if (mode === "signup" && userData.fname === "") {
    message = "FirstName field Empty";
    return errHandler(message);
  }

  if (mode === "signup" && userData.lname === "") {
    message = "LastName field Empty";
    return errHandler(message);
  }

  const auth = getAuth();
  let userID = null;

  if (mode === "signup") {
    await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    )
      .then(async (res) => {
        console.log(res);
        const obj = {
          token: res._tokenResponse.refreshToken,
          email: res._tokenResponse.email,
          id: res.user.uid,
          expiration: res._tokenResponse.expiresIn,
        };
        userID = obj.id;
        const data = {
          name: userData.name,
          transactions: [],
          pin: userData.pin,
          id: res.user.uid,
          email: res._tokenResponse.email,
          firstName: userData.fname,
          lastName: userData.lname,
          status: userData.status,
          createdOn: userData.date,
        };

        localStorage.setItem("auth-token", JSON.stringify(obj));
        await addDoc(collection(db, "Slotin"), {
          name: data.name,
          transactions: data.transactions,
          pin: data.pin,
          id: data.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          status: data.status || true,
          createdOn: data.createdOn,
        });
        //return redirect(`/${userID}`);
      })
      .catch((e) => {
        if (e.code === "auth/network-request-failed") {
          alert("No internet Connection!!");
        }
      });
  }

  if (mode === "login") {
    await signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((res) => {
        const obj = {
          token: res._tokenResponse.refreshToken,
          email: res._tokenResponse.email,
          id: res.user.uid,
          expiration: res._tokenResponse.expiresIn,
        };
        userID = obj.id;
        localStorage.setItem("auth-token", JSON.stringify(obj));
        // return redirect(`/${userID}`);
      })
      .catch((e) => {
        if (e.code === "auth/wrong-password") {
          alert("wrong password");
          // return prom("wrong password");
        }
        if (e.code === "auth/user-not-found") {
          alert("Email not Found!!");
          // return prom("wrong password");
        }
        if (e.code === "auth/too-many-requests") {
          alert("Too many fail Attempt. Try again Later");
        }

        if (e.code === "auth/network-request-failed") {
          alert("No internet Connection!!");
        }
      });
  }
  if (userID === null) return null;
  //

  const res = redirect(`/${userID}`);

  return res;
}
