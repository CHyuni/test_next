'use client';

import { useState } from 'react';
import { signUp } from 'aws-amplify/auth';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
      });
      console.log('회원가입 성공:', isSignUpComplete, userId, nextStep);
      // 회원가입 성공 시 처리
    } catch (error) {
      console.log('회원가입 실패:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
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
      {/* <input 
        type="email" 
        placeholder="이메일" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      /> */}
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
}
