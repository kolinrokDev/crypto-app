import React from "react";
import { Layout } from "antd";
const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  pading: "1rem",
};
const ContentApp = () => {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
};

export default ContentApp;
