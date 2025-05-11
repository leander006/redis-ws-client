'use client';

import { useState, useEffect } from 'react';

const ChatWindow = ({
  roomId,
  messages: initialMessages,
  sendMessageApi,
  fetchMessagesApi,
}: {
  roomId: string;
  messages: { id: string; content: string; userId: string; createdAt: string }[];
  sendMessageApi: (content: string) => Promise<void>;
  fetchMessagesApi: () => Promise<void>;
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    const updatedMessages = await fetchMessagesApi();
    setMessages(updatedMessages);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendMessageApi(newMessage);
    setNewMessage('');
    fetchMessages(); // Refresh messages
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`my-2 max-w-md ${
              msg.userId === 'currentUserId' ? 'self-end text-right' : 'self-start'
            }`}
          >
            <div className="bg-gray-700 p-2 rounded-lg">{msg.content}</div>
            <div className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-grow bg-gray-800 text-white p-2 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-4 py-2 text-white rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
