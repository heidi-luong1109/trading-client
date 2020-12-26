import React, { useState } from "react";
import { Intent, Button, NumericInput } from "@blueprintjs/core";
import { toast } from "../../../utils/toaster";
import { useBitmexRest } from "../../../utils/bitmex_rest";
import { useBitmexState } from "../../../utils/bitmex_state";
import s from "./CreateBuy.module.scss";

const CreateBuy: React.FunctionComponent = () => {
  const { symbol } = useBitmexState();
  const { createOrder } = useBitmexRest();
  const [amount, setAmount] = useState<number>(0);
  const isReady = amount !== 0;


  const handleChangeAmount = (newAmount: number) => {
    setAmount(newAmount);
  };

  const handleCreate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      toast.blue({ message: `Buy ${amount} Contracts of ${symbol} at Market.` });
      const response = await createOrder(symbol, "Market", "Buy", amount);
      const { data } = response;
      toast.blue({ message: `${data.orderQty} contracts of ${data.symbol} bought at ${data.price}. The order has fully filled.` });
    } catch (error) {
      toast.red({ message: error.response.data.error.message });
    }
  };

  return (
    <div className={s["create-buy"]}>
      <div className={s["create-buy__fields"]}>
        <NumericInput
          large={true}
          fill={true}
          onValueChange={handleChangeAmount}
          value={amount > 0 ? amount : ""}
          placeholder={"Enter a amount"}
          selectAllOnFocus={true}
          selectAllOnIncrement={true}
          min={0}
        />
      </div>
      <Button
       className={s["create-buy__button"]}
       large={true}
       text="BUY"
       fill={true}
       intent={Intent.SUCCESS}
       onClick={handleCreate}
       disabled={!isReady}
      />
    </div>
  );
};

export default CreateBuy;
