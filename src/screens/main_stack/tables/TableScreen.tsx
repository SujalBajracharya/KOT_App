import React from 'react';
import { TablesContent } from './TablesContent';
import { useTables } from './useTables';

export default function TableScreen() {
  const { state, action } = useTables();

  return <TablesContent state={state} action={action} />;
}

export { TableScreen as TablesScreen };
