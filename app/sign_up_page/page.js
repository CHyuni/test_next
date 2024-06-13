'use client';

import { useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { useRouter } from 'next/router'; // next/router import

Amplify.configure(awsconfig);

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState(null);
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const router = useRouter(); // useRouter 훅 사용

  const handleSignUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log('회원가입 성공:', user);
      setIsSignUpComplete(true);
    } catch (error) {
      console.log('회원가입 실패:', error);
      setError(error.message);
    }
  };

  const handleConfirmation = async () => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      console.log('확인 성공');
      // 확인 성공 시 로그인 페이지로 이동
      router.push('../sign_in_page');
    } catch (error) {
      console.log('확인 실패:', error);
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
          <button onClick={handleConfirmation}>확인</button>
        </>
      )}
    </div>
  );
}
