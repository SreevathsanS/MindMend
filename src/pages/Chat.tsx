import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, RotateCcw } from 'lucide-react';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your AI wellness companion. I'm here to listen, support, and help you navigate your mental health journey. How are you feeling today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const supportiveResponses = [
    "I hear you, and your feelings are completely valid. It's okay to have difficult days - they're part of being human.",
    "Thank you for sharing that with me. It takes courage to express your feelings. What do you think might help you feel a bit better right now?",
    "That sounds challenging. Remember that you've overcome difficulties before, and you have the strength to get through this too.",
    "I'm glad you're taking time to check in with yourself. Self-awareness is such an important part of mental wellness.",
    "It's wonderful that you're being proactive about your mental health. What's one small thing you could do today to show yourself kindness?",
    "Your feelings matter, and so do you. Sometimes just talking about what we're going through can provide some relief.",
    "I can sense that you're going through something difficult. Would you like to talk about what's on your mind?",
    "It's completely normal to feel this way. You're not alone in this experience, and it's okay to take things one step at a time."
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your AI wellness companion. I'm here to listen, support, and help you navigate your mental health journey. How are you feeling today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-offwhite-300/50 px-6 py-4 shadow-soft">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-lavender-400 to-softblue-500 rounded-full flex items-center justify-center shadow-gentle">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-calm-800">AI Wellness Assistant</h1>
                <p className="text-xs text-calm-600 leading-relaxed">Always here to listen</p>
              </div>
            </div>
            <button
              onClick={resetConversation}
              className="w-10 h-10 bg-offwhite-100/50 rounded-full flex items-center justify-center hover:bg-offwhite-200/50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-calm-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 pb-32 overflow-y-auto">
        <div className="max-w-sm mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-3xl shadow-soft ${
                  message.isUser
                    ? 'bg-gradient-to-r from-lavender-500 to-softblue-500 text-white'
                    : 'bg-white/70 backdrop-blur-sm text-calm-800 border border-white/50'
                }`}
              >
                {!message.isUser && (
                  <div className="flex items-center mb-2">
                    <Sparkles className="w-3 h-3 text-lavender-600 mr-1" />
                    <span className="text-xs font-medium text-calm-600 uppercase tracking-wide">
                      AI Assistant
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.isUser ? 'text-lavender-100' : 'text-calm-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/70 backdrop-blur-sm text-calm-800 border border-white/50 max-w-xs px-4 py-3 rounded-3xl shadow-soft">
                <div className="flex items-center mb-2">
                  <Sparkles className="w-3 h-3 text-lavender-600 mr-1" />
                  <span className="text-xs font-medium text-calm-600 uppercase tracking-wide">
                    AI Assistant
                  </span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-calm-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-calm-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-calm-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input - Improved Alignment and Structure */}
      <div className="fixed bottom-24 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-offwhite-300/50 shadow-gentle">
        <div className="px-6 py-5">
          <div className="max-w-sm mx-auto">
            <div className="flex items-end space-x-4">
              <div className="flex-1 min-w-0">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="w-full p-4 bg-offwhite-100/60 border border-offwhite-300/70 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent text-calm-800 placeholder-calm-400 max-h-24 text-sm leading-relaxed transition-all duration-300 focus:bg-white/80"
                  rows={1}
                />
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-12 h-12 bg-gradient-to-r from-lavender-500 to-softblue-500 text-white rounded-full flex items-center justify-center shadow-gentle disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-soft hover:scale-105 active:scale-95 disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;