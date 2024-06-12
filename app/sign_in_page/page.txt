'use client';

import { useState } from 'react';
import { signIn } from 'aws-amplify/auth';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username,
        password,
      });
      console.log('로그인 성공:', isSignedIn, nextStep);
      // 로그인 성공 시 처리
    } catch (error) {
      console.log('로그인 실패:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      {error && <p>{error}</p>}
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
      <button onClick={handleSignIn}>로그인</button>
    </div>
  );
}