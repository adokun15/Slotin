import cls from "./Input.module.css";

const Input = ({ type, className, onChange, name ,value}) => {
  return (
    <input
    value={value}
      type={type}
      className={`${cls.Input} ${className}`}
      onChange={onChange}
      name={name}
    />
  );
};
export default Input;
