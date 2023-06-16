import Viewport from "../hook/ViewPort";
import cls from "./SidebarContent.module.css";
import { Form, NavLink, useParams } from "react-router-dom";
const SideBarContent = () => {
  const id = useParams();
  const { phoneViewport, toggle, toggleHandler } = Viewport();

  const sidebarlist = (
    <>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? cls.isActive : undefined)}
          to={`/${id.userID}`}
          onClick={toggleHandler}
          end
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? cls.isActive : undefined)}
          to={`withdrawal`}
          onClick={toggleHandler}
        >
          WithDraw
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? cls.isActive : undefined)}
          to={`transfer`}
          onClick={toggleHandler}
        >
          Tranfer
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? cls.isActive : undefined)}
          to={`fund`}
          onClick={toggleHandler}
        >
          Fund Account
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? cls.isActive : undefined)}
          to={`info`}
          onClick={toggleHandler}
        >
          Info
        </NavLink>
      </li>
      <li>
        <Form action="/logout" method="post">
          <button className={cls.logout}>logout</button>
        </Form>
      </li>
    </>
  );

  const sidebar_css = phoneViewport
    ? `${cls.sidebar} ${cls.sidebar__grid}`
    : `${cls.sidebar}`;
  return (
    <nav className={sidebar_css}>
      <h1>SlotIN Bank</h1>
      {phoneViewport && (
        <span>
          <button onClick={toggleHandler} className={cls.menuBtn}>
            {toggle ? "close" : "menu"}
          </button>
        </span>
      )}
      {!phoneViewport && sidebarlist}
      {phoneViewport && toggle && (
        <ul className={cls.sidebar__list}>{sidebarlist}</ul>
      )}
    </nav>
  );
};
export default SideBarContent;
