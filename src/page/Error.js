import { Link, useRouteError } from "react-router-dom";
import PageContent from "../Component/PageContent";
import Nav from "../Component/NavBar";

const Error = () => {
  const err = useRouteError();

  return (
    <>
      <Nav />
      <PageContent style={{ margin: "4rem" }} title={err.message}>
        <Link to="/?type=login">Go Back</Link>
      </PageContent>
    </>
  );
};
export default Error;
