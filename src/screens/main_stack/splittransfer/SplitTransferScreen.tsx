import React from 'react';
import { SplitTransferContent } from './SplitTransferContent';
import { useSplitTransfer } from './useSplitTransfer';

export default function SplitTransferScreen() {
  const { state, action } = useSplitTransfer();

  return <SplitTransferContent state={state} action={action} />;
}
