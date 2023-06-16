import {
  useSearchParams,
  Link,
  Form,
  useNavigation,
  useActionData,
  // useNavigate,
} from "react-router-dom";
import cls from "./AuthForm.module.css";
import Viewport from "../hook/ViewPort";
const AuthForm = () => {
  const err = useActionData();
  const [type] = useSearchParams();
  const loggins = type.get("type") === "login";

  const nav = useNavigation();
  //const navigate = useNavigate();
  const isSubmitting = nav.state === "submitting";

  const btnText = !loggins ? "signup" : "login";

  const { phoneViewport } = Viewport();
  const formCss = !phoneViewport
    ? `${cls.Authform}`
    : `${cls.Authform} ${cls.AuthFormDevice}`;
  return (
    <Form className={formCss} method="post">
      <h2>{loggins ? "login" : "Signup"}</h2>
      <p>{!err ? "" : err}</p>
      {!loggins && (
        <>
          <label>UserName</label>
          <input name="username" type="text" />

          <label>First Name</label>
          <input name="firstname" type="text" />

          <label>Last Name</label>
          <input name="lastname" type="text" />
        </>
      )}
      <label>Email</label>
      <input type="email" name="email" />
      <label>password</label>
      <input type="password" name="password" />
      {!loggins && (
        <>
          <label>Pin</label>
          <input name="pin" type="number" />
        </>
      )}

      <div className={cls.actions}>
        <button>{isSubmitting ? "loading..." : btnText} </button>

        <p className={cls.linked}>
          <Link to={`?type=${loggins ? "signup" : "login"}`}>
            {loggins
              ? "Don't Have an Account...Register"
              : "Already Have An Account...Login"}
          </Link>
        </p>
      </div>
    </Form>
  );
};
export default AuthForm;
