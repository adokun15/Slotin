import {
  query,
  onSnapshot,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
//import { useState } from "react";
import { db } from "../firebase-db";
import { useCallback, useEffect, useState } from "react";
import { Outlet, defer, useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import Viewport from "../hook/ViewPort";
const RootElement = () => {
  const [user, setUser] = useState({
    name: "",
    transactions: [],
    email: "",
    pin: 0,
    docID: "",
    id: "",
    firstName: "",
    lastName: "",
    createdOn: "",
    status: false,
  });
  const [users, setUsers] = useState([]);
  const params = useParams();
  const getToken = useCallback(() => {
    const token = localStorage.getItem("auth-token");
    const data = JSON.parse(token);
    if (!data) {
      return null;
    }
    return data;
  }, []);

  const navigate = useNavigate();
  //const f = useLoaderData();

  //console.log(token);
  /*
  const updateTime = async(t) =>{
    const docRef =  doc(db, user.docID);
    updateDoc(docRef, {expiresIn:t})

  }
  */
  const fethUser = useCallback(async () => {
    try {
      const Users = query(collection(db, "Slotin"));
      onSnapshot(Users, (querySnaps) => {
        //more than one users
        const clUsers = querySnaps.docs.map((doc) => ({
          ...doc.data(),
          docID: doc.id,
        }));
        setUsers(clUsers);

        //one user
        querySnaps.forEach((doc) => {
          if (doc.data().id === params.userID) {
            setUser({ ...doc.data(), docID: doc.id });
          }
        });
      });
      //dispatch(UserAction.AddUser(user));
    } catch (e) {
      console.log(e);
    }
  }, [params.userID]);

  useEffect(() => {
    const token = getToken();

    if (params.userID !== token.id) {
      navigate("/?type=login");
    }
    //const token = localStorage.getItem("auth-token");

    if (token) {
      fethUser();
    }

    if (!token) {
      throw new Error("Could not Authenticate User.");
    }
  }, [fethUser, getToken, navigate, params.userID]);
  const { phoneViewport } = Viewport();
  return (
    <>
      <div
        style={{
          display: "block",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <SideBar />

        {!phoneViewport && <Outlet context={defer({ user, users })} />}
        {phoneViewport && (
          <div
            style={{
              position: "relative",
              marginTop: "5rem",
            }}
          >
            <Outlet context={defer({ user, users })} />
          </div>
        )}
      </div>
    </>
  );
};
export default RootElement;

/*
async function getUser(db, params) {
  //let p = {};
  onSnapshot(db, (querySnaps) => {
    querySnaps.forEach((doc) => {
      if (doc.data().id === params) {
        localStorage.setItem("user", JSON.stringify(doc.data()));
        let promise = new Promise((rev) => {
          rev(doc.data());
        });
        return promise;
      }
    });
  });
  //return p;
}
const Loader = async (p) => {
  const Users = query(collection(db, "Slotin"));
  const token = localStorage.getItem("auth-token");
  //let data = null;
  if (token) {
    const user = await getUser(Users, p);
    onSnapshot(db, (querySnaps) => {
      querySnaps.forEach((doc) => {
        if (doc.data().id === p) {
          //localStorage.setItem("user", JSON.stringify(doc.data()));
          let promise = new Promise((rev) => {
            rev(doc.data());
          });
          return promise;
        }
      });
    });
    return user;
  }
  if (!token) {
    throw new Error("Could not Authenticate User.");
  }
};

export const LoaderDataBase = ({ params }) => {
  const id = params.userID;
  console.log(Loader(id));
  return defer({ user: Loader(id) });
};
*/
