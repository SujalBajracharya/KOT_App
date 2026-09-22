import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/root_stack';
import { BillPaymentContent } from './BillPaymentContent';
import { useBillPayment } from './useBillPayment';

type BillRouteProp = RouteProp<RootStackParamList, 'bill'>;

export default function BillPaymentScreen() {
  const route = useRoute<BillRouteProp>();
  const TABLENO = route.params?.TABLENO;
  const { state, action } = useBillPayment(TABLENO);

  return <BillPaymentContent state={state} action={action} />;
}
