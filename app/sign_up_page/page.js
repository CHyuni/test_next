'use client';

import { useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState(null);
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const [storedUsername, setStoredUsername] = useState(''); // Add state to store username
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      console.log('회원가입 성공:', isSignUpComplete, userId, nextStep);
      setStoredUsername(username); // Store the username
      setIsSignUpComplete(true);
    } catch (error) {
      console.log('회원가입 실패:', error);
      setError(error.message);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp(storedUsername, confirmationCode); // Use stored username
      console.log('인증 성공');
      router.push('/signin');
    } catch (error) {
      console.log('인증 실패:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      {error && <p>{error}</p>}
      {!isSignUpComplete ? (
        <>
          <input 
            type="text" 
            placeholder="사용자 이름" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="이메일" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <button onClick={handleSignUp}>회원가입</button>
        </>
      ) : (
        <>
          <input 
            type="text" 
            placeholder="확인 코드" 
            value={confirmationCode} 
            onChange={(e) => setConfirmationCode(e.target.value)} 
          />
          <button onClick={handleConfirmSignUp}>확인</button>
        </>
      )}
    </div>
  );
}
