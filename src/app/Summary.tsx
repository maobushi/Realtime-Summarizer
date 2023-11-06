"use client"

import { useState, useEffect } from 'react';

interface SummaryProps {
  text: string;
}

const Summary: React.FC<SummaryProps> = ({ text }) => {
  const [summaries, setSummaries] = useState<string[]>([]);

  const fetchSummary = async (inputText: string) => {
    const response = await fetch('YOUR_CHATGPT_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: `要約: ${inputText}` }),
    });

    const data = await response.json();
    const summary = data.choices[0].text.trim();
    setSummaries((prev) => [...prev, summary]);
  };

  useEffect(() => {
    // textが20の倍数になるたびに要約を更新
    if (text.length && text.length % 20 === 0) {
      const startIndex = text.length - 40 > 0 ? text.length - 40 : 0; // 最後の40文字のみを取得
      const inputText = text.slice(startIndex, startIndex + 20); // 20文字ごとに取得

      const fakeSummary = `偽装要約: ${inputText}...`; 
      setSummaries((prev) => [...prev, fakeSummary]);
    }
  }, [text]);

  return (
    <div>
      <h1>要約</h1>
      <ul>
        {summaries.map((summary, index) => (
          <li key={index}>{summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
