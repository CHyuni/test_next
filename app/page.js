'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);

  const handleButtonClick = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}test`);
      const data = await response.json();
      setResult(data.body);
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
