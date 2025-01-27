"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function textToEmoji(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that translates text to emojis.",
      },
      {
        role: "user",
        content: `Translate the following text to emojis, only return the emojis and nothing else. The text should form a coherent sentence. Feel free to get creative.: ${text}`,
      },
    ],
  });

  return completion.choices[0].message.content;
}

export async function emojiToText(emojis: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that translates emojis to text.",
      },
      {
        role: "user",
        content: `Translate the following emojis to text, only return the text and nothing else. : ${emojis}`,
      },
    ],
  });

  return completion.choices[0].message.content;
}
