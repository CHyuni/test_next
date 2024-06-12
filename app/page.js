'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);

  const handleButtonClick = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // 디버깅을 위한 콘솔 출력
        setResult(data.body);
    } catch (error) {
        console.error('Error:', error);
        setError(error.message);
    }
};

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>홈페이지</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Link href="/sign_in_page" style={{ marginRight: '20px', padding: '10px 20px', background: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          로그인
        </Link>
        <Link href="/sign_up_page" style={{ marginLeft: '20px', padding: '10px 20px', background: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          회원가입
        </Link>
      </div>
      <br></br>
      <button onClick={handleButtonClick}>Call Lambda</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}
