import React from "react";
import { CreateBuy } from "./CreateBuy";
import { CreateSell } from "./CreateSell";
import s from "./CreateOrder.module.scss";

const CreateOrder: React.FunctionComponent = () => (
  <div className={s["create-order"]}>
    <h1 className={s["create-order__title"]}>Create order</h1>
    <div className={s["create-order__content"]}>
      <div className={s["create-order__content-buy"]}>
        <CreateBuy />
      </div>
      <div className={s["create-order__content-sell"]}>
        <CreateSell />
      </div>
    </div>
  </div>
);

export default CreateOrder;
