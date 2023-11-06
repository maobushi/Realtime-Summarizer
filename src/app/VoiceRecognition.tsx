"use client"
import { useState, useRef, useEffect } from 'react';

interface VoiceRecognitionProps {
  onTextChange: (text: string) => void;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ onTextChange }) => {
  const [finalTranscript, setFinalTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<null | SpeechRecognition>(null);

  useEffect(() => {
    onTextChange(finalTranscript + interimTranscript);
  }, [finalTranscript, interimTranscript, onTextChange]);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API はこのブラウザにはサポートされていません。');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = (event) => {
        let newInterimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setFinalTranscript((prevTranscript) => prevTranscript + transcript + ' ');
          } else {
            newInterimTranscript += transcript;
          }
        }
        setInterimTranscript(newInterimTranscript);
      };

      recognition.onend = () => {
        if (isListening) {
          recognitionRef.current!.start();
        }
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div>
      <h1>音声認識</h1>
      {isListening ? (
        <button onClick={stopListening}>音声認識を停止</button>
      ) : (
        <button onClick={startListening}>音声認識を開始</button>
      )}
      <p>{finalTranscript + interimTranscript}</p>
    </div>
  );
};

export default VoiceRecognition;
