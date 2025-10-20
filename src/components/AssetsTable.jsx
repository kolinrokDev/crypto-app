import React from "react";
import { Table } from "antd";
import { useCrypto } from "../context/cryptocomtext";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.price - b.price,
    sortDirections: ["descend"],
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
];

const AssetsTable = () => {
  const { assets } = useCrypto();
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.id,
    price: asset.price,
    amount: asset.amount,
  }));
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AssetsTable;
