import CartItem from '@/components/reusables/cart-item';
import { CartType } from '@/components/types/cart-type';
import { HouseholdDataType } from '@/components/utils/generate-data';
import React from 'react'

type CartSectionProps = {
  data: CartType[];
  onRemoveItem: (index: number) => void;
  onGenerateReport: (report: CartType[]) => void;
  onClickItem?: (data: CartType) => void;
};

const CartSection = (props: CartSectionProps) => {
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-semibold'>Region Cart <span className='font-normal text-base'>({props.data.length})</span></h2>
      <div className='flex flex-col space-y-3'>
        {props.data.map((item, index) => (
          <CartItem onClick={props.onClickItem} key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default CartSection