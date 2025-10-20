import { Divider, Flex, Tag, Typography } from "antd";
import React from "react";

const CoinInfoModal = ({ coin }) => {
  return (
    <>
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} width={"40px"} />
        <Typography.Title level={"2"} style={{ margin: 0 }}>
          {coin.symbol}
          {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 Час </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>

        <Typography.Text strong>1 День </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1d}%
        </Tag>

        <Typography.Text strong>1 Неделя </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Текущая цена:</Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text>Цена в BTC: </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Капитализация: </Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text>Контрактный адрес: </Typography.Text>
          {coin.contractAddress}$
        </Typography.Paragraph>
      )}
    </>
  );
};

export default CoinInfoModal;
