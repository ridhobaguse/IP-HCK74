import React, { useState, useEffect, useRef } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Markdown from "react-markdown";

const GeminiAi = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const API_KEY = "AIzaSyAnPkyzY-TQ-L2tZ0e5ZrOaqAYj1D48Eok"; // Your API key
  const MODEL_NAME = "gemini-1.0-pro-001"; // Model name

  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        if (!chat) {
          const newChat = await genAI
            .getGenerativeModel({ model: MODEL_NAME })
            .startChat({
              generationConfig,
              safetySettings,
              history: messages.map((msg) => ({
                text: msg.text,
                role: msg.role,
              })),
            });
          setChat(newChat);
        }
      } catch (error) {
        console.error("Chat initialization failed:", error);
        setError("Failed to initialize chat.");
      }
    };
    initChat();
  }, [chat, messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;
    setLoading(true);
    setError(null);

    const newMessage = { text: userInput, role: "user", timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput("");

    try {
      if (chat) {
        const result = await chat.sendMessage(userInput);
        const botMessage = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (err) {
      console.error("Message sending failed:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={toggleChatVisibility}
      >
        Ask me about Valorant!
      </button>

      {isChatVisible && (
        <div
          className="chatbox absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 max-h-[400px] max-w-[350px] overflow-y-auto overflow-x-hidden border border-gray-300"
          ref={chatBoxRef}
        >
          <ul className="chat-list space-y-2">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`chat-message ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  <Markdown className="chat-message-content text-black">
                    {msg.text}
                  </Markdown>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex mt-4 space-x-2">
            <input
              type="text"
              id="userInput"
              className="flex-1 border rounded-lg px-4 py-2 text-black"
              placeholder="Enter your message"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              onClick={handleSendMessage}
              disabled={!userInput.trim() || loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default GeminiAi;
