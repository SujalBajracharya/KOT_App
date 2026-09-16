import React from 'react';
import { SignInContent } from './SignInContent';
import { useSignIn } from './useSignIn';

export default function SignInScreen() {
  const { state, action } = useSignIn();

  return <SignInContent state={state} action={action} />;
}
