'use client';

import Header from '@/app/components/Header';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  content: string;
  roomId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

const ChatUI = () => {

const [messages, setMessages] = useState<Message[]>([]);
const [newMessage, setNewMessage] = useState('');
const [user, setUser] = useState<User | null>(null);
const {roomId} = useParams()

const getMessages = async () => {
  try {
    const userString = localStorage.getItem("user");
    const newUser = userString ? JSON.parse(userString) : null;
    setUser(newUser as User);

    const response = await fetch(`/api/rooms/${roomId}/messages`, {
      method: 'GET',
    });
    const data = await response.json();
    setMessages(data.messages)        
  } catch (err) {
      console.log(err);
  }
};

const sendMessage = async (roomId: string, content: string) => {
  // Replace with your API call logic
  setMessages([...messages,content])
};

useEffect(() => {
  getMessages();
}, [roomId,setNewMessage,newMessage])


  return (
  <div className="flex flex-col h-screen bg-gray-900 text-white">
  <Header showBackButton />

  <div className="flex-grow overflow-y-auto p-4">
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`my-4 max-w-md ${
          msg.userId === user?.id ? "ml-auto text-right" : "mr-auto text-left"
        }`}
      >
        {/* Sender's Name */}
        <div className="text-sm font-semibold text-gray-400 mb-1">
          {msg.user.name}
        </div>
        {/* Message Content */}
        <div className="bg-gray-700 p-3 rounded-lg text-white ">
          {msg.content}
        </div>
        {/* Timestamp */}
        <div className="text-xs text-gray-500 mt-1">
          {new Date(msg.createdAt).toLocaleTimeString()}
        </div>
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

export default ChatUI;
