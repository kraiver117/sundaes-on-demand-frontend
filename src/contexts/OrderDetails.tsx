import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";
import { formatCurrency } from "../utils/formatCurrency";

type Totals = {
  scoops: string;
  toppings: string;
  grandTotal: string;
};

type OptionType = "scoops" | "toppings";

type OptionsCount = {
  scoops: Map<any, any>;
  toppings: Map<any, any>;
};

export type OrderDetailsContext = [
  orderDetails: { totals: Totals } & OptionsCount,
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ) => void,
  resetOrder: () => void
];

const OrderDetails = createContext<OrderDetailsContext | null>(null);

// Create custom hook to check whether we're inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
}

function calculateSubtotal(
  optionType: OptionType,
  optionsCounts: OptionsCount
) {
  let optionCount = 0;

  for (const count of optionsCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props: any) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: OptionType
    ): void {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = newOptionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    // getter: object containing option counts for scoops and toppings, subtotal and total
    // setter: update option counts
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder] as const;
  }, [optionCounts, totals]);

  return (
    <OrderDetails.Provider value={value} {...props}></OrderDetails.Provider>
  );
}
