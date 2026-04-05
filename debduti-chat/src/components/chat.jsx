import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, ArrowLeft } from 'lucide-react';
import './Chat.css';

const Chat = ({ onNavigate }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Initial message from you to start the vibe
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hey Debduti! So glad you clicked the button. How's your day going? 💙", 
      sender: 'ai', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);

  // Ref to handle auto-scrolling to the bottom of the chat
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add Debduti's message to the UI instantly
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user', time: currentTime }]);
    setInputValue('');
    setIsTyping(true); // Show "typing" indicator

    try {
      // 2. Send the message to your backend
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Add Sirshendu's (AI) reply to the UI
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: data.reply, 
          sender: 'ai', 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
      } else {
        console.error("Backend error:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsTyping(false); // Hide "typing" indicator
    }
  };

  // Allow sending by pressing the Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Variants for Framer Motion animations
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50 }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 250, damping: 25 } }
  };

  return (
    <motion.div 
      className="chat-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background Hearts Pattern */}
      <div className="chat-bg-pattern">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <Heart size={30} fill="#60a5fa" color="#60a5fa" opacity={0.4} />
          </div>
        ))}
      </div>

      {/* Main Chat Box */}
      <div className="chat-box">
        {/* Header */}
        <div className="chat-header">
          <motion.button 
            className="back-button" 
            onClick={onNavigate}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          
          <div className="avatar">S</div>
          
          <div className="header-info">
            <h2>Sirshendu</h2>
            <div className="status">
              <motion.div 
                className="status-dot"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              Online 24x7
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="chat-messages">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                layout // Smoothly adjust position when new messages arrive
              >
                {msg.text}
                <span className="time">{msg.time}</span>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div 
                className="message received"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '20px' }}>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%' }} />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%' }} />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <div className="input-wrapper">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Message Sirshendu..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <motion.button 
              className="send-button"
              onClick={handleSendMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;