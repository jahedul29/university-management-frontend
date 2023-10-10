import { ReactElement, ReactNode } from "react";

type IActionBarProps = {
  title: string;
  children: ReactNode | ReactElement;
};

const ActionBar = ({ title, children }: IActionBarProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          margin: "10px 0px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
