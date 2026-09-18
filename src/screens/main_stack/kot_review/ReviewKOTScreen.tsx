import React from 'react';
import { ReviewKOTContent } from './ReviewKOTContent';
import { useKot } from './useKot';

export default function ReviewKOTScreen() {
  const { state, action } = useKot();

  return <ReviewKOTContent state={state} action={action} />;
}
