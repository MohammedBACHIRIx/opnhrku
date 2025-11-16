"use client"

import { useState } from "react"
import { Send, Bot, User, Loader2, BookOpen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  recommendations?: Recommendation[]
}

interface Recommendation {
  id: string
  title: string
  description: string
  category: string
  url: string
  slug: string
  relevance: number
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Here are some recommendations based on your query: "${inputMessage}"`,
        timestamp: new Date(),
        recommendations: generateRecommendations(inputMessage)
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateRecommendations = (query: string): Recommendation[] => {
    // Mock recommendations based on query - in production this would use full-text search
    const allRecommendations = [
      {
        id: "1",
        title: "Advanced Machine Learning with Python",
        description: "Comprehensive guide to ML algorithms and implementations",
        category: "AI/ML",
        url: "https://example.com/ml-course",
        slug: "advanced-machine-learning-python",
        relevance: 0.95
      },
      {
        id: "2",
        title: "Python for Data Science Handbook",
        description: "Essential Python tools and techniques for data analysis",
        category: "AI/ML",
        url: "https://example.com/python-data-science",
        slug: "python-data-science-handbook",
        relevance: 0.88
      },
      {
        id: "3",
        title: "Deep Learning Fundamentals",
        description: "Introduction to neural networks and deep learning concepts",
        category: "AI/ML",
        url: "https://example.com/deep-learning",
        slug: "deep-learning-fundamentals",
        relevance: 0.82
      }
    ]

    // Filter based on query keywords
    const keywords = query.toLowerCase().split(' ')
    return allRecommendations.filter(rec => 
      keywords.some(keyword => 
        rec.title.toLowerCase().includes(keyword) ||
        rec.description.toLowerCase().includes(keyword) ||
        rec.category.toLowerCase().includes(keyword)
      )
    ).slice(0, 3)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold">AI Assistant</h1>
          </div>
          <p className="text-muted-foreground">
            Ask me about courses, tools, books, or papers. I'll find the best resources for you.
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Chat with Assistant</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96 px-6 py-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start a conversation to get personalized resource recommendations</p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                    {message.type === 'assistant' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    
                    <div className={`max-w-xs lg:max-w-md ${message.type === 'user' ? 'order-1' : ''}`}>
                      <div className={`rounded-lg px-4 py-2 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      
                      {/* Recommendations */}
                      {message.recommendations && (
                        <div className="mt-4 space-y-3">
                          {message.recommendations.map((rec) => (
                            <Card key={rec.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                                  <Badge variant="outline" className="ml-2">
                                    {rec.category}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {rec.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">
                                    Relevance: {(rec.relevance * 100).toFixed(0)}%
                                  </span>
                                  <Button size="sm" asChild>
                                    <a href={`/resource/${rec.slug}`}>
                                      View Resource
                                    </a>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Finding recommendations...
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="border-t p-6">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ask about courses, tools, books, or papers..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputMessage.trim() || isLoading}
                  size="icon"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Suggestions */}
        <div className="text-center">
          <h3 className="font-semibold mb-4">Try asking about:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Best resources for learning Python")}
            >
              Python Learning
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Machine learning courses for beginners")}
            >
              Machine Learning
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Electronics engineering books")}
            >
              Electronics
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Research methodology resources")}
            >
              Research Methods
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Web development tools 2024")}
            >
              Web Development
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}