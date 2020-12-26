import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { config } from "../../constants";

type CreateOrderType = (
  symbol: string,
  type: string,
  side: string,
  amount: number,
  price?: number,
) => Promise<AxiosResponse<any>>;

type ClosePositionType = (
  symbol: string,
  type: string,
  side: string,
  amount: number,
  price?: number,
) => Promise<AxiosResponse<any>>;

type GetInstrumentsType = () => Promise<AxiosResponse<any>>;
type GetPositionType = () => Promise<AxiosResponse<any>>;

interface IBitmexRestProvider {
  children: React.ReactNode;
}

interface IBitmexRestContext {
  createOrder: CreateOrderType;
  getMarkets: GetInstrumentsType;
  getPosition: GetPositionType;
  closePosition: ClosePositionType;
}

const BitmexRestContext: React.Context<IBitmexRestContext | any> = React.createContext({});

export const BitmexRestProvider: React.FunctionComponent<IBitmexRestProvider> = ({ children }) => {
  const http = axios.create({
    baseURL: `${config.proxy.host}:${config.proxy.port}${config.bitmex.basePath}`,
    headers: {
      "content-type": "application/json",
      "Accept": "application/json",
      "bitmex-api-testnet": config.bitmex.testnet,
      "bitmex-api-key": config.bitmex.key,
      "bitmex-api-secret": config.bitmex.secret,
    },
  });

  const createOrder = async (symbol: string, type: string, side: string, amount: number, price?: number) => {
    return await http.post("/order", {
      symbol: symbol,
      side: side,
      ordType: type,
      price: price,
      orderQty: amount,
    });
  };

  const closePosition = async (symbol: string, price?: number) => {
    return await http.post("/order/closePosition", {
      symbol: symbol,
      price: price,
    });
  };

  const getInstruments = async () => {
    return await http.get("/instrument/activeAndIndices");
  };

  const getPosition = async () => {
    return await http.get("/position");
  };

  return (
    <BitmexRestContext.Provider value={{
      createOrder: createOrder,
      getInstruments: getInstruments,
      getPosition: getPosition,
      closePosition: closePosition,
    }}>
      {children}
    </BitmexRestContext.Provider>
  );
};

export const useBitmexRest = () => (React.useContext(BitmexRestContext));
