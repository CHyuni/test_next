'use client'


import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

export default function SignUpPage() {
  return (
    <Authenticator signUpAttributes={[]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}