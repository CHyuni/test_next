'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [audioSrc, setAudioSrc] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const audioRef = useRef(null);

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}captcha`, {
        method: 'GET'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);  // 디버깅용
        setAudioSrc(data.audioUrl);
        setAnswer(data.answer);
        setFileName(data.fileName);
        setMessage('');
        setUserInput('');
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        }
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch audio:', response.status, errorText);
        setMessage('오디오를 가져오는데 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === answer) {
      setMessage('정답입니다!');
    } else {
      setMessage('틀렸습니다. 다시 시도해주세요.');
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
        <div>
          <audio ref={audioRef} controls>
            <source src={audioSrc} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <p>File Name: {fileName}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your answer"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {message && <p>{message}</p>}
      {answer && <p>Answer (for testing): {answer}</p>}
    </div>
  );
}