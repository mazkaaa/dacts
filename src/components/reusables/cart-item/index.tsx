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
};
const CartItem = (props: CartItemProps) => {
  return (
    <div>CartItem</div>
  )
}

export default CartItem