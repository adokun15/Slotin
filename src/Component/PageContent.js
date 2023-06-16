import cls from "./PageContent.module.css";
const PageContent = ({ title, children }) => {
  return (
    <main className={cls.PageContent}>
      <h1>{title}</h1>
      {children}
    </main>
  );
};
export default PageContent;
