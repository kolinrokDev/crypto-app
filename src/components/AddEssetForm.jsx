import React, { useState } from "react";
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
} from "antd";

const AddEssetForm = () => {
  const [form] = Form.useForm();
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
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
  function onFinish() {}
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
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} width={"40px"} />
        <Typography.Title level={"2"} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </Flex>
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
