import { Fragment } from "react";
import ReactDOM from "react-dom";
import c from "./Modal.module.css";

const BackDrop = () => {
  return <div className={c.backdrop}></div>;
};

const ModalOverlay = ({ className, children }) => {
  return (
    <div className={`${c.modal} ${className}`}>
      <div className={c.content}>{children}</div>
    </div>
  );
};

const Modal = (prop) => {
  const portalEl = document.getElementById("Backdrop");
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop />, portalEl)}
      {ReactDOM.createPortal(
        <ModalOverlay className={prop.className}>{prop.children}</ModalOverlay>,
        portalEl
      )}
    </Fragment>
  );
};
export default Modal;
