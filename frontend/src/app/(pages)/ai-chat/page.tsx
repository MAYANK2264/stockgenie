"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Hello! How can I assist you with your trading today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || ''
      const response = await fetch(`${apiBase}/api/ml/suggest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage: Message = { sender: 'ai', text: data.suggestion || 'No suggestion found.' };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } else {
        console.error('Failed to get AI suggestion:', response.statusText);
        const errorMessage: Message = { sender: 'ai', text: 'Error: Could not get a suggestion. Please try again.' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message to AI:', error);
      const errorMessage: Message = { sender: 'ai', text: 'Error: Something went wrong. Please check your network.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <h1 className="text-3xl font-bold tracking-tight mb-6">AI Chat Assistant</h1>

      <Card className="flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>Chat with TradeGenie AI</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-4">
          <ScrollArea className="flex-grow pr-4 mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${msg.sender === 'user'
                    ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}
                  `}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-2">
                <span className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800 animate-pulse">
                  Typing...
                </span>
              </div>
            )}
          </ScrollArea>
          <div className="flex">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              className="flex-grow mr-2"
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}