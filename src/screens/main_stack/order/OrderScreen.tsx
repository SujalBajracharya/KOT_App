import React from 'react';
import { OrderContent } from './OrderContent';
import { useOrder } from './useOrder';

export default function OrderScreen() {
  const { state, action } = useOrder();

  return <OrderContent state={state} action={action} />;
}
