import React, { useEffect, useState } from "react";
import { Button, Layout, Modal, Select, Space, Drawer } from "antd";
import { useCrypto } from "../../context/cryptocomtext";
import CoinInfoModal from "../CoinInfoModal";
import AddEssetForm from "../AddEssetForm";
const headerStyle = {
  width: "100%",
  textAlign: "center",
  color: "#fff",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const HeaderApp = () => {
  const [drawer, setDrawer] = useState(false);
  const [coin, setcoin] = useState(null);
  const [modal, setmodal] = useState();
  const [select, setSelect] = useState(false);
  const { crypto } = useCrypto();
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);
  function handelSelect(value) {
    setmodal(true);
    setcoin(crypto.find((c) => c.id === value));
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        onSelect={handelSelect}
        // mode="multiple"
        style={{ width: "250px" }}
        onClick={() => setSelect((prev) => !prev)}
        placeholder="press / open"
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
      <Button type="primary" onClick={() => setDrawer(true)}>
        Asset
      </Button>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={modal}
        onOk={() => setmodal(false)}
        onCancel={() => setmodal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={"600px"}
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnHidden
      >
        <AddEssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
};

export default HeaderApp;
