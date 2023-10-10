"use client";
import { Layout, theme } from "antd";
import { ReactNode } from "react";
import Header from "./Header";

const { Content, Footer } = Layout;
const Contents = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider={false}>
      <Content style={{ minHeight: "100vh" }}>
        <Header />

        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            color: "black",
            height: "100%",
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Contents;
