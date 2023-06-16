export const ExpirationTime = () => {
  const today = new Date();
  today.setMinutes(10);
  return today.toISOString();
};
/*
export const setExpiration = () =>{
    const Users = query(collection(db, "Slotin"));
      //one user
      querySnaps.forEach((doc) => {
        if (doc.data().id === params.userID) {
          setUser({ ...doc.data(), docID: doc.id });
        }
      });
    
    //dispatch(UserAction.AddUser(user));
  }
*/
