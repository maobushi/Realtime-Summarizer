"use client";

import { useState, useEffect } from 'react';

interface SummaryProps {
  text: string;
}

const Summary: React.FC<SummaryProps> = ({ text }) => { 
  const [summary, setSummary] = useState<string>(''); // 単一の要約を保持するように変更
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async (prompt: string) => {
    try {
      console.log(prompt);
      const res = await fetch('/api/open_ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt}),
      });

      const data = await res.json();
      console.log({data});
      const answer = data.body;
      console.log({answer});
      const content = answer.content;
      console.log({content});
      return content;
    } catch (err: any) {
      setError(err.message);
      return '';
    }
  };

  useEffect(() => {
    const updateSummary = async () => {
      if (text.length && text.length % 50 === 0) {
        let startIndex = text.length <= 200 ? 0 : text.length - 200;
        const prompt = text.slice(startIndex);
        const newSummary = await fetchSummary(prompt);
        setSummary(newSummary); // 現在の要約を新しい要約で更新
      }
    };
    updateSummary();
  }, [text]); // textが変わるたびにuseEffectを実行

  return (
    <div>
      <h1>要約</h1>
      {error && <p>エラー: {error}</p>}
      <p className='pre'>{summary}</p> {/* 要約を表示 */}
    </div>
  );
};

export default Summary;
