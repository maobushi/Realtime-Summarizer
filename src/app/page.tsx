"use client"


import VoiceRecognition from './VoiceRecognition';
import Summary from './Summary';
import { useState, useEffect } from 'react';
import OpenAI from "openai";

//const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

const Home: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [lastText, setLastText] = useState<string>('');

  useEffect(() => {
    // textが20文字以上増加した場合のみ、lastTextを更新
    if (text.length - lastText.length >= 20) {
      //const fetchSummary = async () => {
      //  const response = await openai.chat.completions.create({
      //    model: "gpt-3.5-turbo",
      //    messages: [
      //      { role: "system", content: "You are a helpful assistant." },
      //      { role: "user", content: `Summarize this for me: ${text}` }
      //    ],
      //  });
      //  console.log(response.choices[0]);
      //  setLastText(text);  // OpenAIの要約後にlastTextを更新
      //}
      //fetchSummary();
     // console.log(text);
    }
  }, [text]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, borderRight: '1px solid black', padding: '20px' }}>
        <VoiceRecognition onTextChange={setText} />
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <Summary text={text} lastText={lastText} />
      </div>
    </div>
  );
};

export default Home;


//// pages/index.js
//import { useState, useRef } from 'react';

//export default function Home() {
//  const [finalTranscript, setFinalTranscript] = useState('');
//  const [interimTranscript, setInterimTranscript] = useState('');
//  const [isListening, setIsListening] = useState(false);
//  const recognitionRef = useRef(null);

//  const startListening = () => {
//    if (!('webkitSpeechRecognition' in window)) {
//      alert('Web Speech API はこのブラウザにはサポートされていません。');
//      return;
//    }

//    if (!recognitionRef.current) {
//      const recognition = new window.webkitSpeechRecognition();
//      recognition.lang = 'ja-JP';
//      recognition.interimResults = true;
//      recognition.continuous = true;

//      recognition.onresult = (event) => {
//        let newInterimTranscript = '';
//        for (let i = event.resultIndex; i < event.results.length; i++) {
//          const transcript = event.results[i][0].transcript;
//          if (event.results[i].isFinal) {
//            setFinalTranscript(prevTranscript => prevTranscript + transcript + ' ');
//          } else {
//            newInterimTranscript += transcript;
//          }
//        }
//        setInterimTranscript(newInterimTranscript);
//      };

//      recognition.onerror = (event) => {
//        console.error('音声認識エラー:', event);
//        setIsListening(false);
//      };

//      recognition.onend = () => {
//        if (isListening) {
//          recognitionRef.current.start();
//        }
//      };

//      recognitionRef.current = recognition;
//    }

//    recognitionRef.current.start();
//    setIsListening(true);
//  };

//  const stopListening = () => {
//    if (recognitionRef.current) {
//      recognitionRef.current.stop();
//      setIsListening(false);
//    }
//  };

//  return (
//    <div style={{ display: 'flex', height: '100vh' }}>
//      <div style={{ flex: 1, borderRight: '1px solid black', padding: '20px' }}>
//        <h1>音声認識</h1>
//        {isListening ? (
//          <button onClick={stopListening}>音声認識を停止</button>
//        ) : (
//          <button onClick={startListening}>音声認識を開始</button>
//        )}
//        <p>{finalTranscript + interimTranscript}</p>
//      </div>
//      <div style={{ flex: 1, padding: '20px' }}>
//        <h1>要約</h1>
//        <ul>
//          {/* ここに要約を箇条書きで表示 */}
//        </ul>
//      </div>
//    </div>
//  );
  
//}
