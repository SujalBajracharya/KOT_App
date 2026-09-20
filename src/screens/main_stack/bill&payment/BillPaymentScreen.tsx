import React from 'react';
import { BillPaymentContent } from './BillPaymentContent';
import { useBillPayment } from './useBillPayment';

export default function BillPaymentScreen() {
  const { state, action } = useBillPayment();

  return <BillPaymentContent state={state} action={action} />;
}
