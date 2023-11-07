"use client";
import { NextApiRequest, NextApiResponse } from 'next';
const { OpenAI } = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

// 名前付きエクスポートを使用してPOSTメソッドをエクスポート
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("POST API is called");
  const { prompt } = req.body;
  console.log(prompt); 

  try {
    const completion = await openai.Completion.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt }],
    });

    console.log(completion);
    const answer = completion.data.choices[0].message.content;

    res.status(200).json({ answer: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing your request' });
  }
}