import React from 'react';
import { SettlementContent } from './SettlementContent';
import { useSettlement } from './useSettlement';

export default function SettlementScreen() {
  const { state, action } = useSettlement();

  return <SettlementContent state={state} action={action} />;
}
