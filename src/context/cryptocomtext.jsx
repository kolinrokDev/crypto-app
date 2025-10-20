import { Children, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import ApiFetchCrypto, { fakeAsset } from "../api";
import { percentDifferece } from "../components/utils";

const CryptoContext = createContext({
  asset: [],
  crypto: [],
  loadind: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preLoader() {
      setLoading(true);
      const resault = await ApiFetchCrypto();
      const assents = await fakeAsset();
      setAssets(
        assents.map((asset) => {
          const coin = resault.find((c) => c.id === asset.id);
          return {
            grow: asset.price < coin.price,
            growPercent: percentDifferece(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            tottalProfit:
              asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        })
      );
      setCrypto(resault);
      setLoading(false);
    }
    preLoader();
  }, []);

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
