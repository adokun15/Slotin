import btnClass from "./Button.module.css";
const Button = ({ children, onClick, className }) => {
  const classes = `${btnClass.button} ${className}`;
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
export default Button;
