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

  function mapAssets(assets, resault) {
    return assets.map((asset) => {
      const coin = resault.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifferece(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        tottalProfit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preLoader() {
      setLoading(true);
      const resault = await ApiFetchCrypto();
      const assets = await fakeAsset();
      setAssets(mapAssets(assets, resault));
      setCrypto(resault);
      setLoading(false);
    }
    preLoader();
  }, []);
  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
