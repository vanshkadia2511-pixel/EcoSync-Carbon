import React, { useState, useRef, useEffect } from 'react';
import { useEcoStore } from '../store/useEcoStore';
import { api } from '../lib/api';
import { getMockReply } from '../lib/mockAI';
import type { ChatMessage, ActionItem } from '../types/carbon';

export default function CoachPage() {
  const { latestFootprint, chatHistory, addChatMessage, clearChatHistory, isDemoMode, sessionId } = useEcoStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollBottom();
  }, [chatHistory, loading]);

  // Initial welcome message if history is empty
  useEffect(() => {
    if (chatHistory.length === 0) {
      addChatMessage({
        id: 'welcome',
        role: 'assistant',
        content: `Hello! I am your EcoCoach. ${
          latestFootprint 
            ? `I see your latest monthly carbon footprint is **${latestFootprint.monthlyKgCO2e} kg CO₂e**, and your highest category is **${latestFootprint.highestCategory}**.`
            : 'Please complete an audit or load demo data so I can give you personalized advice.'
        } Ask me anything about reducing your carbon footprint or building sustainable habits!`,
        timestamp: new Date().toISOString(),
      });
    }
  }, [chatHistory.length, latestFootprint, addChatMessage]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    addChatMessage(userMsg);
    setInput('');
    setLoading(true);

    try {
      let replyText = '';
      let actions: ActionItem[] = [];

      if (isDemoMode) {
        // Use Mock AI logic directly
        const result = getMockReply(text, latestFootprint || undefined);
        replyText = result.reply;
        actions = result.actions;
      } else {
        // Make backend call
        try {
          const res = await api.chat({
            sessionId,
            message: text,
            latestFootprint: latestFootprint || undefined,
          });
          replyText = res.reply;
          actions = res.actions || [];
        } catch (err) {
          console.warn('Backend chat failed, using local mock AI:', err);
          const result = getMockReply(text, latestFootprint || undefined);
          replyText = result.reply;
          actions = result.actions;
        }
      }

      addChatMessage({
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: replyText,
        actions: actions.length > 0 ? actions : undefined,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
      addChatMessage({
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const chips = [
    'How can I reduce my footprint this week?',
    'Give me a 7-day green plan',
    'What are some free actions to save carbon?',
    'Explain my electricity footprint',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in flex flex-col h-[calc(100vh-140px)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">AI EcoCoach</h1>
          <p className="text-gray-500 mt-1">Get personalized climate action recommendations and answers.</p>
        </div>
        <button
          onClick={clearChatHistory}
          className="px-3.5 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium rounded-lg transition duration-150"
        >
          Clear History
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl rounded-2xl p-4 shadow-sm leading-relaxed text-sm ${
                msg.role === 'user'
                  ? 'bg-green-600 text-white rounded-tr-none'
                  : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-line font-normal">
                  {msg.content}
                </div>

                {/* Attached Actions */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200/40 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider block text-green-700">Recommended Actions:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.actions.map((act, i) => (
                        <div key={i} className="p-3 bg-white border border-gray-100 rounded-xl flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100">
                              {act.category}
                            </span>
                            <h4 className="font-semibold text-gray-800 mt-2 text-xs">{act.title}</h4>
                          </div>
                          <div className="mt-4 flex justify-between items-center text-[10px] text-gray-400 font-medium">
                            <span>Saved: -{act.estimatedKgCO2eSaved} kg</span>
                            <span className="capitalize">{act.cost}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[10px] mt-2 block ${msg.role === 'user' ? 'text-green-100 text-right' : 'text-gray-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none p-4 text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span>EcoCoach is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Action Chips */}
        {chatHistory.length <= 2 && (
          <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex flex-wrap gap-2 overflow-x-auto">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="px-3.5 py-1.5 bg-white border border-gray-200 hover:border-green-500 hover:text-green-600 rounded-full text-xs text-gray-600 font-medium transition duration-150 shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-4 border-t border-gray-100 flex gap-2 bg-white"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your environmental question here..."
            className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition duration-150"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium rounded-xl text-sm transition duration-150 shadow-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
