import React, { useRef, useState } from "react";
import { useCrypto } from "../context/cryptocomtext";
import {
  Divider,
  Flex,
  Select,
  Space,
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import CoinInfo from "./CoinInfo";

const AddEssetForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const assetref = useRef();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        // open={select}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        // mode="multiple"
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: "20px" }} src={option.data.icon} />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }
  function handelAmoutChengr(value) {
    const price = form.getFieldValue("price");
    form.setFieldValue("total", +(value * price).toFixed(2));
  }

  function handelPriceChengr(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldValue("total", +(value * amount).toFixed(2));
  }
  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      data: values.data?.$d ?? new Date(),
    };
    console.log(newAsset);
    assetref.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }
  function onClose() {
    setSubmitted(false);
  }
  if (submitted) {
    return (
      <Result
        status="success"
        title="New asset added"
        subTitle={`Addes ${assetref.current.amount} of ${coin.name} by price ${assetref.current.price}$`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
    );
  }
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Anount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handelAmoutChengr}
        />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber onChange={handelPriceChengr} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Date & Time" name="data">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEssetForm;
