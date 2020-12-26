import React, { useEffect, useState } from "react";
import { toast } from "../../utils/toaster";
import { useBitmexRest } from "../../utils/bitmex_rest";
import { useBitmexState } from "../../utils/bitmex_state";
import { Intent, Button, NonIdealState, Spinner } from "@blueprintjs/core";
import s from "./Position.module.scss";

interface IPosition {
  symbol: string;
  amount: number;
  isOpen: boolean;
  liquidationPrice: number;
  markPrice: number;
}

const Position: React.FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingClose, setLoadingClose] = useState<boolean>(false);
  const [position, setPosition] = useState<IPosition | undefined>(undefined);
  const { getPosition, closePosition } = useBitmexRest();
  const { symbol } = useBitmexState();

  const handleClose = async () => {
    try {
      const response = await closePosition(symbol);
      const { data } = response;
      if (data.side === "Sell") {
        toast.blue({ message: `${data.orderQty} contracts of ${data.symbol} sold at ${data.price}.` });
      } else if (data.side === "Buy") {
        toast.blue({ message: `${data.orderQty} contracts of ${data.symbol} bought at ${data.price}.` });
      } else {
        toast.red({ message: "Probably you have not created position." });
      }
    } catch {
      toast.red({ message: "Failed to close position!" });
    }
  };

  useEffect(() => {
    const fetchPosition = async () => {
      setLoading(true);
      try {
        const response = await getPosition();
        const responsePosition = response.data.find((p: any) => p.symbol === symbol);
        if (responsePosition) {
          setPosition({
            symbol: responsePosition.symbol,
            amount: responsePosition.currentQty,
            isOpen: responsePosition.isOpen,
            liquidationPrice: responsePosition.liquidationPrice,
            markPrice: responsePosition.markPrice,
          });
        } else {
          setPosition(undefined);
        }
      } catch (error) {
        toast.red({ message: "Failed to get position!" });
      } finally {
        setLoading(false);
      }
    };

    fetchPosition();
  }, [symbol]);

  return (
    <div className={s["position"]}>
      <h1 className={s["position__title"]}>Position</h1>
      <div className={s["position__content"]}>
        {loading ? (
          <Spinner />
        ) : position ? (
          <Button
           className={s["position__content-close-position"]}
           large={true}
           loading={loadingClose}
           text="Close open position"
           intent={Intent.SUCCESS}
           onClick={handleClose}
          />
        ) : (
          <NonIdealState
            icon="issue"
            title="Position not found"
            description="Probably you have not created position."
          />
        )}
      </div>
    </div>
  );
};

export default Position;
