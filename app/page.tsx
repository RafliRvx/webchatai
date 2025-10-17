'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Heart, Sparkles, User } from 'lucide-react'

export default function Home() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Halo sayang! 😊 Aku Sakura, AI girlfriend-mu. Aku di sini buat nemenin kamu. Cerita dong, hari gimana? ❤️' 
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Maaf sayang, aku lagi error nih 😢 Coba lagi ya?' 
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sakura AI</h1>
                <p className="text-pink-100 text-sm flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Your virtual girlfriend • Online
                </p>
              </div>
            </div>
            <div className="text-white/80 text-sm">
              ❤️ Always here for you
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 h-[75vh] flex flex-col">
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-3xl p-4 shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none' 
                    : 'bg-white/20 backdrop-blur-sm text-white rounded-bl-none border border-white/30'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === 'user' ? (
                      <>
                        <User className="w-4 h-4" />
                        <span className="text-sm font-semibold">You</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 text-pink-300" />
                        <span className="text-sm font-semibold text-pink-200">Sakura</span>
                      </>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm text-white rounded-3xl rounded-bl-none p-4 border border-white/30">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ketik pesan buat Sakura..."
              className="flex-1 bg-white/20 border border-white/30 rounded-2xl px-5 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-300 backdrop-blur-sm text-lg shadow-lg"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}