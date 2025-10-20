import { Layout, Spin } from "antd";
import React, { useContext } from "react";
import SiderApp from "./layout/SiderApp";

import HeaderApp from "../components/layout/HeaderApp";
import ContentApp from "../components/layout/ContentApp";
import CryptoContext from "../context/cryptocomtext";
const AppLayOut = () => {
  const { loading } = useContext(CryptoContext);
  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout>
      <HeaderApp />
      <Layout>
        <SiderApp />
        <ContentApp />
      </Layout>
    </Layout>
  );
};

export default AppLayOut;
