import { cryptoAssets } from "./components/data";

async function ApiFetchCrypto() {
  const url = "https://openapiv1.coinstats.app/coins";
  const options = {
    method: "GET",
    headers: { "X-API-KEY": "cd0pYakB0NOmG3XgCsP0u42lNt6wDiU1S+U3E6WRPB4=" },
    body: undefined,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data.result;
  } catch (error) {
    console.error(error);
  }
}

export function fakeAsset() {
  return new Promise((reselve) => {
    setTimeout(() => {
      reselve(cryptoAssets);
    }, 2000);
  });
}

export default ApiFetchCrypto;
