"use client";

import VoiceRecognition from './VoiceRecognition';
import Summary from './Summary';
import { useState } from 'react';

const Home: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, borderRight: '1px solid black', padding: '20px' }}>
        <VoiceRecognition onTextChange={handleTextChange} />
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <Summary text={text} />
      </div>
    </div>
  );
};

export default Home;
