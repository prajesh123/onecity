
import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader } from 'lucide-react';
import { generateHelpResponse } from '../../services/geminiService';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: "Hello! I'm your AI assistant. How can I help you with the One City Grocery app today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await generateHelpResponse(input);
            const botMessage: Message = { sender: 'bot', text: response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 z-50"
            >
                <MessageSquare size={28} />
            </button>
            {isOpen && (
                <div className="fixed bottom-20 right-5 w-full max-w-sm h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
                    <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-2xl">
                        <h3 className="font-bold text-lg">AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-blue-700"><X /></button>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                    {msg.sender === 'bot' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"><Bot size={20}/></div>}
                                    <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-gray-200 text-gray-800 rounded-br-none' : 'bg-blue-500 text-white rounded-bl-none'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    {msg.sender === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center"><User size={20}/></div>}
                                </div>
                            ))}
                            {isLoading && <div className="flex justify-center"><Loader className="animate-spin text-blue-500" /></div>}
                        </div>
                    </div>
                    <div className="p-4 border-t flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask a question..."
                            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAssistant;
