
import React, { useState } from 'react';
// Note: In a real app, the geminiService would be updated to call a secure backend function.
// For this frontend prototype, we'll simulate the call.

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setIsLoading(true);
    setResponse('');
    // Simulate API call
    await new Promise(res => setTimeout(res, 1000));
    setResponse(`This is a simulated AI response to: "${prompt}". I can help with questions about app features like Roles, Payments, and Orders.`);
    setIsLoading(false);
    setPrompt('');
  };

  if (!isOpen) {
    return (
      <button onClick={handleToggle} style={fabStyle}>
        AI
      </button>
    );
  }

  return (
    <div style={chatWindowStyle}>
      <div style={chatHeaderStyle}>
        <span>AI Assistant</span>
        <button onClick={handleToggle} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>✕</button>
      </div>
      <div style={chatBodyStyle}>
        {response && <div style={responseBubbleStyle}>{response}</div>}
        {isLoading && <div>Loading...</div>}
      </div>
      <form onSubmit={handleSubmit} style={chatInputFormStyle}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about app features..."
          style={chatInputStyle}
          disabled={isLoading}
        />
        <button type="submit" style={chatSubmitStyle} disabled={isLoading}>Send</button>
      </form>
    </div>
  );
};

// Styles
const fabStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#1a237e',
  color: 'white',
  border: 'none',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  zIndex: 1000,
};

const chatWindowStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  width: '350px',
  height: '500px',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
};

const chatHeaderStyle: React.CSSProperties = {
  backgroundColor: '#1a237e',
  color: 'white',
  padding: '1rem',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const chatBodyStyle: React.CSSProperties = {
  flex: 1,
  padding: '1rem',
  overflowY: 'auto',
};

const responseBubbleStyle: React.CSSProperties = {
  backgroundColor: '#e8eaf6',
  padding: '0.75rem',
  borderRadius: '10px',
  marginBottom: '1rem',
};

const chatInputFormStyle: React.CSSProperties = {
  display: 'flex',
  padding: '1rem',
  borderTop: '1px solid #eee',
};

const chatInputStyle: React.CSSProperties = {
  flex: 1,
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginRight: '0.5rem',
};

const chatSubmitStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#3f51b5',
  color: 'white',
  cursor: 'pointer',
};

export default AIAssistant;
