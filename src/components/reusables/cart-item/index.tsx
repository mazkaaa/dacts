import { CartType } from '@/components/types/cart-type';
import { currencyFormat } from '@/components/utils/currency-format';
import { HouseholdDataType } from '@/components/utils/generate-data';
import React from 'react'

type CartItemProps = {
  region_name: string;
  monthly_income: number;
  monthly_savings: number;
  monthly_expenses: number;
  monthly_debt: number;
  position: [number, number];
  index: number;
  colorValue: number;
  onClick?: (data: CartType) => void;
};
const CartItem = (props: CartItemProps) => {
  return (
    <button onClick={() => {
      if (props.onClick) {
        props.onClick({
          colorValue: props.colorValue,
          index: props.index,
          monthly_debt: props.monthly_debt,
          monthly_expenses: props.monthly_expenses,
          monthly_income: props.monthly_income,
          monthly_savings: props.monthly_savings,
          position: props.position,
          region_name: props.region_name,
        })
      }
    }} className="space-y-2 rounded-lg border-2 border-gray-600 p-3 text-start">
      <h4 className="text-base font-medium">{props.region_name}</h4>
      <div className="">
        <div>
          <span className="text-sm font-semibold">Monthly Income: </span>
          <span className="text-sm">
            {currencyFormat(props.monthly_income)}
          </span>
        </div>
        <div>
          <span className="text-sm font-semibold">Monthly Savings: </span>
          <span className="text-sm">
            {currencyFormat(props.monthly_savings)}
          </span>
        </div>
        <div>
          <span className="text-sm font-semibold">Monthly Expenses: </span>
          <span className="text-sm">
            {currencyFormat(props.monthly_expenses)}
          </span>
        </div>
        <div>
          <span className="text-sm font-semibold">Monthly Debt: </span>
          <span className="text-sm">{currencyFormat(props.monthly_debt)}</span>
        </div>
      </div>
    </button>
  );
}

export default CartItem