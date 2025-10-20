import { Flex, Typography } from "antd";
import React from "react";

const CoinInfo = ({ coin, widthSymbol }) => {
  return (
    <Flex align="center">
      <img src={coin.icon} alt={coin.name} width={"40px"} />
      <Typography.Title level={"2"} style={{ margin: 0 }}>
        {widthSymbol && <sapn>({coin.symbol})</sapn>}
        {coin.name}
      </Typography.Title>
    </Flex>
  );
};

export default CoinInfo;
