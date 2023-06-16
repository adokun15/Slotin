import cls from "./nav.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useNavigation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const Nav = () => {
  const s = useNavigation();
  const navigate = useNavigate();
  const submitting = s.state === "submitting" ? "loading" : "Demo";
  /*
  useEffect(() => {
    if (t) {
      navigate(`/${t.id}`);
    }
  }, [t, navigate]);
*/
  const loggin = async (userData) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((res) => {
        const obj = {
          token: res._tokenResponse.refreshToken,
          email: res._tokenResponse.email,
          id: res.user.uid,
          expiration: res._tokenResponse.expiresIn,
        };

        localStorage.setItem("auth-token", JSON.stringify(obj));
        //  if (obj.id !== null) {
        //  navigate(`/${obj.id}`);
        //}

        //    return obj.id;
      })
      .catch((e) => {
        if (e.code === "auth/too-many-requests") {
          alert("Too many fail Attempt. Try again Later");
          // return prom("wrong password");
        }

        if (e.code === "auth/network-request-failed") {
          alert("No internet Connection!!");
          // return prom("wrong password");
        }
      });
    //.then((e) => alert(e.status));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(e.currentTarget);1
    // const data = new FormData(<Demo />);
    const data = new FormData();
    data.set("email", "lo@gmail.com");
    data.set("password", "amos2005");

    const obj = { email: data.get("email"), password: data.get("password") };

    navigate("/?type=login");
    await loggin(obj);

    const token = localStorage.getItem("auth-token");
    const t = JSON.parse(token);

    navigate(`/${t.id}`);

    //console.log("ji");
  };
  return (
    <nav className={cls.nav}>
      <h1>SlotIN</h1>

      <div>
        <button type="submit" onClick={handleSubmit}>
          {submitting}
        </button>
      </div>
    </nav>
  );
};
export default Nav;
