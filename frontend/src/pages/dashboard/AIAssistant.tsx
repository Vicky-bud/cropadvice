import { apiFetch } from "@/lib/api"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Sprout, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am your CropAdvice AI Assistant. How can I help you with your crops today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await apiFetch("/api/ml/chat/history")
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) {
            setMessages(data)
          }
        }
      } catch (e) {
        console.error("Failed to load chat history", e)
      }
    }
    fetchHistory()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleClearChat = async () => {
    if (!confirm("Are you sure you want to clear your chat history?")) return
    
    try {
      const res = await apiFetch("/api/ml/chat/history", {
        method: "DELETE"
      })
      if (res.ok) {
        setMessages([
          {
            role: "assistant",
            content: "Hello! I am your CropAdvice AI Assistant. How can I help you with your crops today?",
          },
        ])
      }
    } catch (e) {
      console.error("Failed to clear chat history", e)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg: ChatMessage = { role: "user", content: input }
    
    // We send history (excluding the very first welcome message if we want to save tokens, but it's fine to send it)
    const history = messages.slice(1) // exclude the hardcoded welcome message from history

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const response = await apiFetch("/api/ml/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMsg.content,
          history: history,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am having trouble connecting to the network right now. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white dark:bg-neutral-950 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
            <Sprout className="w-6 h-6 text-green-600 dark:text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">CropAdvice AI</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Powered by Gemini 1.5 Flash</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClearChat}
          title="Clear Chat History"
          className="text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] md:max-w-[70%] ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-neutral-900 dark:bg-neutral-100 ml-3"
                    : "bg-green-600 dark:bg-green-600 mr-3"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-5 h-5 text-white dark:text-neutral-900" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div
                className={`px-4 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-tr-sm"
                    : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 rounded-tl-sm"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex flex-row max-w-[80%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mr-3">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="px-4 py-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 rounded-tl-sm flex items-center">
                <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
                <span className="ml-2 text-sm text-neutral-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 max-w-4xl mx-auto"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crop diseases, fertilizers, harvesting..."
            className="flex-1 px-4 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            size="icon"
            className="rounded-full w-12 h-12 flex-shrink-0 bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
