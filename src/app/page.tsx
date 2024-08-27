'use client'
import { useState } from 'react'
import { textToEmoji, emojiToText } from './actions'

const spinnerCSS = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
  }
`

export default function Home() {
  const [textInput, setTextInput] = useState('')
  const [emojiInput, setEmojiInput] = useState('')
  const [textResult, setTextResult] = useState('')
  const [emojiResult, setEmojiResult] = useState('')
  const [isLoadingEmoji, setIsLoadingEmoji] = useState(false)
  const [isLoadingText, setIsLoadingText] = useState(false)

  const handleTextToEmoji = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoadingEmoji(true)
    try {
      const result = await textToEmoji(textInput)
      setEmojiResult(result || 'No result')
    } catch (error) {
      setEmojiResult('An error occurred')
    } finally {
      setIsLoadingEmoji(false)
    }
  }

  const handleEmojiToText = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoadingText(true)
    try {
      const result = await emojiToText(emojiInput)
      setTextResult(result || 'No result')
    } catch (error) {
      setTextResult('An error occurred')
    } finally {
      setIsLoadingText(false)
    }
  }

  const handleCopyAndTranslateToText = () => {
    setEmojiInput(emojiResult)
    handleEmojiToText({ preventDefault: () => {} } as React.FormEvent)
  }

  const handleCopyAndTranslateToEmoji = () => {
    setTextInput(textResult)
    handleTextToEmoji({ preventDefault: () => {} } as React.FormEvent)
  }

  const handleCopyFromEmojiAndSubmit = () => {
    setTextInput(emojiResult)
    setTimeout(() => handleTextToEmoji({ preventDefault: () => {} } as React.FormEvent), 0)
  }

  const handleCopyFromTextAndSubmit = () => {
    setEmojiInput(textResult)
    setTimeout(() => handleEmojiToText({ preventDefault: () => {} } as React.FormEvent), 0)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-12 px-4">
      <style dangerouslySetInnerHTML={{__html: spinnerCSS}} />
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Emoji Translator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Text to Emoji</h2>
            <form onSubmit={handleTextToEmoji}>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text here"
                rows={4}
              />
              <div className="mt-4 flex space-x-2">
                <button 
                  type="submit" 
                  className="flex-grow px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                  disabled={isLoadingEmoji}
                >
                  {isLoadingEmoji ? <div className="spinner mr-2"></div> : null}
                  {isLoadingEmoji ? 'Translating...' : 'Translate to Emoji'}
                </button>
                <button 
                  type="button"
                  onClick={handleCopyFromTextAndSubmit}
                  className="px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition duration-300"
                  disabled={isLoadingEmoji || !textResult}
                >
                  ↑
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100 rounded-md min-h-[100px] text-lg text-gray-800">
              {emojiResult}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Emoji to Text</h2>
            <form onSubmit={handleEmojiToText}>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                value={emojiInput}
                onChange={(e) => setEmojiInput(e.target.value)}
                placeholder="Enter emojis here"
                rows={4}
              />
              <div className="mt-4 flex space-x-2">
                <button 
                  type="submit" 
                  className="flex-grow px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
                  disabled={isLoadingText}
                >
                  {isLoadingText ? <div className="spinner mr-2"></div> : null}
                  {isLoadingText ? 'Translating...' : 'Translate to Text'}
                </button>
                <button 
                  type="button"
                  onClick={handleCopyFromEmojiAndSubmit}
                  className="px-4 py-2 bg-green-300 text-white rounded-md hover:bg-blue-400 transition duration-300"
                  disabled={isLoadingText || !emojiResult}
                >
                  ↑
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100 rounded-md min-h-[100px] text-lg text-gray-800">
              {textResult}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
