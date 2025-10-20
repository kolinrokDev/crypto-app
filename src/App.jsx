import "./App.css";
import React from "react";

import { CryptoContextProvider } from "./context/cryptocomtext";
import AppLayOut from "./components/AppLayOut";

function App() {
  return (
    <>
      <CryptoContextProvider>
        <AppLayOut />
      </CryptoContextProvider>
    </>
  );
}

export default App;
