import React, { useState } from "react";

interface IBitmexStateProvider {
  children: React.ReactNode;
}

interface IBitmexStateContext {
  symbol: string;
  setSymbol: (newSymbol: string) => void;
}

const defaultState = {
  symbol: "XBTUSD",
};

const BimtexStateContext: React.Context<IBitmexStateContext | any> = React.createContext(defaultState);

export const BitmexStateProvider: React.FunctionComponent<IBitmexStateProvider> = ({ children }) => {
  const [symbol, setSymbol] = useState<string>(defaultState.symbol);

  return (
    <BimtexStateContext.Provider value={{
      symbol: symbol,
      setSymbol: setSymbol,
    }}>
      {children}
    </BimtexStateContext.Provider>
  );
};

export const useBitmexState = () => (React.useContext(BimtexStateContext));
