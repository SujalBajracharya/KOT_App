import React from 'react';
import { HomeContent } from './HomeContent';
import { useHome } from './useHome';

export default function HomeScreen() {
  const { state, action } = useHome();

  return <HomeContent state={state} action={action} />;
}
