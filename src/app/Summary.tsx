"use client";

import { useState, useEffect } from 'react';

interface SummaryProps {
  text: string;
}

const Summary: React.FC<SummaryProps> = ({ text }) => { 
  const [summaries, setSummaries] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async (inputText: string) => {
	try {
		const res = await fetch('/api/open_ai', { // URLを修正
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ prompt: inputText }) // 'yourPrompt' を実際のプロンプトに置き換える必要があるかもしれません
		});
  
	  if (!res.ok) {
		throw new Error(`Error: ${res.status}`);
	  }
  
	  const data = await res.json();
	  return data.answer.trim(); // 修正: responseの構造に合わせる
	} catch (err: any) {
	  setError(err.message);
	  return '';
	}
  };
  

  useEffect(() => {
    const updateSummary = async () => {
      if (text.length && text.length % 20 === 0) {
        const startIndex = text.length - 40 > 0 ? text.length - 40 : 0;
        const inputText = text.slice(startIndex, startIndex + 20);
        const newSummary = await fetchSummary(inputText);
        setSummaries(prev => [...prev, newSummary]);
      }
    };
    updateSummary();
  }, [text]); 

  return (
    <div>
      <h1>要約</h1>
      {error && <p>エラー: {error}</p>}
      <ul>
        {summaries.map((summary, index) => (
          <li key={index}>{summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
