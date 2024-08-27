'use client'
import Image from "next/image";
import { useState } from 'react'

export default function Home() {
  const [textInput, setTextInput] = useState('')
  const [emojiInput, setEmojiInput] = useState('')
  const [textResult, setTextResult] = useState('')
  const [emojiResult, setEmojiResult] = useState('')

  const handleTextToEmoji = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement server action call
    setEmojiResult('Emoji result will appear here')
  }

  const handleEmojiToText = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement server action call
    setTextResult('Text result will appear here')
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Emoji Translator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Text to Emoji</h2>
          <form onSubmit={handleTextToEmoji}>
            <textarea
              className="w-full p-2 border rounded"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text here"
              rows={4}
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Translate to Emoji
            </button>
          </form>
          <div className="mt-4 p-2 border rounded min-h-[100px]">
            {emojiResult}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Emoji to Text</h2>
          <form onSubmit={handleEmojiToText}>
            <textarea
              className="w-full p-2 border rounded"
              value={emojiInput}
              onChange={(e) => setEmojiInput(e.target.value)}
              placeholder="Enter emojis here"
              rows={4}
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
              Translate to Text
            </button>
          </form>
          <div className="mt-4 p-2 border rounded min-h-[100px]">
            {textResult}
          </div>
        </div>
      </div>
    </main>
  )
}
