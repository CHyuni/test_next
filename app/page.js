'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [audioSrc, setAudioSrc] = useState(null);
  const [answer, setAnswer] = useState(null);
  const audioRef = useRef(null);

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}captcha`, {
        method: 'GET'
      });
      
      if (response.ok) {
        const data = await response.json();
        setAudioSrc(data.audioUrl);
        setAnswer(data.answer);
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play();
        }
      } else {
        console.error('Failed to fetch audio');
      }
    } catch (error) {
      console.error('Error:', error);
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
      <br />
      <button onClick={handleButtonClick}>Play Audio Captcha</button>
      {audioSrc && (
        <audio ref={audioRef} controls>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      {answer && <p>Answer (for testing): {answer}</p>}
    </div>
  );
}