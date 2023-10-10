import { Space, Spin } from "antd";

const Loading = () => {
  return (
    <Space
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" style={{ height: 400 }} />
    </Space>
  );
};

export default Loading;
