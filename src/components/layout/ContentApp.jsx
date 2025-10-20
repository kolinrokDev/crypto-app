import React from "react";
import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/cryptocomtext";
import PorfolioChart from "../PorfolioChart";
import AssetsTable from "../AssetsTable";
const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  pading: "1rem",
};
const ContentApp = () => {
  const { assets, crypto } = useCrypto();
  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  const sumCion = assets.map((asset) => {
    return asset.amount * cryptoPriceMap[asset.id];
  });

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "white" }}>
        Portfolio :{" "}
        {sumCion
          .reduce((acc, v) => {
            return acc + v;
          }, 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PorfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
};

export default ContentApp;
