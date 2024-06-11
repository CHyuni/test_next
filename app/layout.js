'use client';

import { useEffect } from 'react';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

export default function Layout({ children }) {
  useEffect(() => {
    Amplify.configure(awsconfig);
  }, []);

  return <div>{children}</div>;
}
