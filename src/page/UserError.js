import { Link, useParams, useRouteError } from "react-router-dom";
import PageContent from "../Component/PageContent";
import SideBar from "./SideBar";

const UserError = () => {
  const err = useRouteError();
  const id = useParams();
  return (
    <>
      <SideBar />
      <PageContent style={{ margin: "8rem" }} title={err.message}>
        <Link to={`/${id.userID}`}>Go Back</Link>
      </PageContent>
    </>
  );
};
export default UserError;
