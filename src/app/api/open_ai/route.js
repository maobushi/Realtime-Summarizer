"use server";

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';


const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

// 名前付きエクスポートを使用してPOSTメソッドをエクスポート
export async function POST(req) {
  const body = await req.json();
  const prompt = body.prompt;
  //console.log({body});

  //console.log({prompt}); 

    const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "以下に述べる内容を要約し、箇条書きでまとめてください。また、意味ごとに、適切なインデント(tab)を挿入してください。また、あなたの意見は求めていないので、歴史的な正誤や内容に対するコメントは避けてください。"},
        { role: "user", content: prompt }],
      model: "gpt-4-1106-preview",
      
      
    });
    console.log("OPEN AI API IS CALLED!");
    //console.log(completion.choices[0].message);
    const answer = completion.choices[0].message;
    return NextResponse.json({body : answer});
  }
    //return new Response(JSON.stringify({answer}))};