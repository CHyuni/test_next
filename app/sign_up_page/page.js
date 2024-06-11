'use client'

import { Auth } from 'aws-amplify';
import { useState } from 'react';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const signUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // 이메일 등 추가 속성도 전달 가능
        },
      });
      console.log('회원가입 성공:', user);
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
      <input 
        type="email" 
        placeholder="이메일" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={signUp}>회원가입</button>
    </div>
  );
}