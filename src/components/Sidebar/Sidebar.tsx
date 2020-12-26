import React from "react";
import { config } from "../../constants";
import { useBitmexState } from "../../utils/bitmex_state";
import { renderSymbol, filterSymbol } from "../../utils/symbol_renderer";
import { Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import s from "./Sidebar.module.scss";


const Sidebar: React.StatelessComponent = () => {
  const { symbol, setSymbol } = useBitmexState();
  const symbols = config.bitmex.symbols.toString().split(",");
  const handleItemSelect = (newSymbol: string) => setSymbol(newSymbol);

  return (
    <div className={s["sidebar"]}>
      <div className={s["sidebar__header"]}>
        <h2 className={s["sidebar__header-title"]}>Bitmex Client</h2>
        <h2 className={s["sidebar__header-subtitle"]}>v0.0.1</h2>
      </div>

      <div className={s["sidebar__content"]}>
        <div className={s["sidebar__content-label"]}>Select symbol:</div>
        <Select
           itemPredicate={filterSymbol}
           itemRenderer={renderSymbol}
           items={symbols}
           filterable={false}
           onItemSelect={handleItemSelect}
           activeItem={symbol}
          >
           <Button text={symbol} rightIcon={"caret-down"} />
        </Select>
      </div>
    </div>
  );
};

export default Sidebar;
