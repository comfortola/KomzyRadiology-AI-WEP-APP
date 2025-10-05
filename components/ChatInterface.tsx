import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, ModelType, Mode } from '../types';
import { createGeminiChatSession } from '../services/geminiService';
import { sendMessageToMistral } from '../services/ollamaService';
import ChatMessage from './ChatMessage';
import Loader from './Loader';
import Welcome from './Welcome';
import type { Chat } from '@google/genai';

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);


const ChatInterface: React.FC<{ model: ModelType, mode: Mode }> = ({ model, mode }) => {
    const [messages, setMessages] = useState<Message[]>([
        { 
            role: 'model', 
            content: mode === 'professional' 
                ? "Hello! I am your AI Radiology Assistant. How can I help you with medical imaging queries today?" 
                : "Hello! I can help answer general questions about medical imaging procedures. How can I assist you today?"
        }
    ]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const chatSession = useRef<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (model === 'gemini') {
            chatSession.current = createGeminiChatSession(mode);
        } else {
            chatSession.current = null; // Clear session if not Gemini
        }
    }, [model, mode]);

    useEffect(() => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [messages]);
    
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      // Auto-resize textarea
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handlePromptClick = (prompt: string) => {
      setInput(prompt);
      setTimeout(() => {
          const form = document.getElementById('chat-form');
          if (form instanceof HTMLFormElement) {
            form.requestSubmit();
          }
      }, 0);
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        if(inputRef.current) {
            inputRef.current.style.height = 'auto';
        }

        setIsLoading(true);
        setError(null);
        setMessages(prev => [...prev, { role: 'model', content: '' }]);

        try {
            if (model === 'gemini') {
                if (!chatSession.current) throw new Error("Gemini chat session not initialized.");
                const stream = await chatSession.current.sendMessageStream({ message: currentInput });

                let text = '';
                for await (const chunk of stream) {
                    text += chunk.text;
                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1].content = text;
                        return newMessages;
                    });
                }
            } else if (model === 'mistral') {
                const responseText = await sendMessageToMistral(currentInput, mode);
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = responseText;
                    return newMessages;
                });
            }
        } catch (err) {
            const errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again later.";
            setError(errorMessage);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = errorMessage;
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, model, mode]);
    
    const showWelcome = messages.length <= 1;

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-200 overflow-hidden">
            <div ref={chatContainerRef} className="flex-1 p-6 space-y-6 overflow-y-auto">
                {showWelcome ? <Welcome onPromptClick={handlePromptClick} mode={mode} /> : (
                  <>
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {isLoading && messages[messages.length-1]?.role === 'model' && !messages[messages.length-1]?.content && <Loader />}
                  </>
                )}
            </div>
            
            <div className="p-4 bg-white border-t border-slate-200">
                {error && <div className="text-center text-red-500 text-sm pb-2 px-4">{error}</div>}
                <form id="chat-form" onSubmit={handleSubmit} className="relative">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={handleInput}
                        placeholder={mode === 'professional' ? "Ask about imaging findings, techniques, or concepts..." : "Ask a question about a medical imaging procedure..."}
                        className="w-full px-4 py-3 pr-14 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 resize-none"
                        disabled={isLoading}
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                e.currentTarget.form?.requestSubmit();
                            }
                        }}
                    />
                    <button
                        type="submit"
                        aria-label="Send message"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                    >
                       <SendIcon className="h-5 w-5"/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;