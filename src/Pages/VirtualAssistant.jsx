import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const VirtualAssistant = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! 👋 Ask me anything about agriculture.', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const controllerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'hi-IN'; // Hindi (change to 'en-IN' for English)
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        // Auto send after speaking
        setTimeout(() => handleSendMessage(transcript), 100);
      };

      recognitionRef.current.onerror = (event) => {
        toast.error(`Voice recognition error: ${event.error}`);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Text-to-Speech function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN'; // Hindi voice (change as needed)
      window.speechSynthesis.speak(utterance);
    }
  };

  // Typing animation effect
  const typeMessage = (text, messageIndex) => {
    let index = 0;
    setIsTyping(true);
    
    typingIntervalRef.current = setInterval(() => {
      if (index < text.length) {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[messageIndex].text = text.substring(0, index + 1);
          return newMessages;
        });
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        // Speak the complete message
        speakText(text);
      }
    }, 20);
  };

  // Send message function
  const handleSendMessage = async (messageText = null) => {
    const msg = (messageText || inputValue).trim();
    if (!msg) return;

    // Add user message
    setMessages(prev => [...prev, { text: msg, sender: 'user' }]);
    setInputValue('');

    // Add empty bot message that will be filled with typing effect
    const botMessageIndex = messages.length + 1;
    setMessages(prev => [...prev, { text: '', sender: 'bot' }]);

    // Create abort controller for timeout
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    try {
      const timeout = setTimeout(() => controllerRef.current.abort(), 30000);

      const response = await fetch(`/chat?message=${encodeURIComponent(msg)}`, { signal });
      clearTimeout(timeout);

      if (!response.ok) throw new Error(response.statusText);
      const reply = await response.text();

      // Start typing animation
      typeMessage(reply, botMessageIndex);

    } catch (err) {
      if (err.name === 'AbortError') {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[botMessageIndex].text = '⚠️ Request timeout. Please try again!';
          return newMessages;
        });
      } else {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[botMessageIndex].text = '⚠️ Error occurred. Please try again!';
          return newMessages;
        });
      }
      setIsTyping(false);
    }
  };

  // Stop generation
  const handleStopGeneration = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    setIsTyping(false);
    
    // Stop speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Voice input
  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        toast.error('Voice recognition is already running');
      }
    } else {
      toast.error('Voice recognition not supported in this browser');
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section py-5 text-center" style={{ background: '#2D5016', color: 'white' }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Farmer's Virtual Assistant</h1>
          <p className="lead mb-4">How Can I Help You Today?</p>
        </div>
      </section>

      {/* Vertical Chat Section */}
      <section className="py-5 bg-light">
        <div className="container d-flex justify-content-center">
          <div className="chatbot-box">

            {/* Chat Header */}
            <div className="chatbot-header p-3 text-white rounded-top">
              <strong>AgriConnect Assistant</strong>
            </div>

            {/* Chat Messages */}
            <div className="chatbot-body border p-3 bg-white">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message mb-2 ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}
                >
                  <span className={`badge ${message.sender === 'user' ? 'bg-secondary' : 'bg-success'} p-3`}>
                    {message.text}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="chatbot-footer d-flex p-2 border rounded-bottom">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Type or speak your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />

              {/* Voice Button */}
              <button
                type="button"
                className={`btn btn-light text-primary me-2 ${isListening ? 'active' : ''}`}
                onClick={handleVoiceInput}
                title="Speak"
                disabled={isTyping}
              >
                <i className={`fas ${isListening ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
              </button>

              {/* Send Button */}
              <button
                type="button"
                className="btn btn-light text-success"
                onClick={() => handleSendMessage()}
                disabled={isTyping}
              >
                <i className="fas fa-paper-plane"></i>
              </button>

              {/* Stop Button */}
              <button
                type="button"
                className="btn btn-light text-danger ms-2"
                onClick={handleStopGeneration}
                title="Stop generation"
                disabled={!isTyping}
              >
                <i className="fas fa-stop"></i>
              </button>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .chatbot-box {
          width: 100%;
          max-width: 600px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          font-family: 'Achr', sans-serif;
          font-size: 18px;
        }

        .chatbot-header {
          background: linear-gradient(135deg, #2D5016, #4CAF50);
        }

        .chatbot-body {
          height: 450px;
          overflow-y: auto;
          padding: 10px;
          background-color: #f9f9f9;
        }

        .message span {
          display: inline-block;
          padding: 12px 16px;
          border-radius: 12px;
          max-width: 75%;
          word-wrap: break-word;
          white-space: pre-wrap;
          font-size: 16px;
        }

        .user-message span {
          background-color: #6c757d !important;
          color: white;
        }

        .bot-message span {
          background-color: #28a745 !important;
          color: white;
        }

        .chatbot-footer {
          background: linear-gradient(135deg, #2D5016, #4CAF50);
        }

        .chatbot-footer input {
          flex: 1;
        }

        #chatbotVoice.active,
        .btn.active {
          background-color: #ffcccc;
          border-radius: 50%;
        }

        .badge {
          font-size: 16px;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default VirtualAssistant;