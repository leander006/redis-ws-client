'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function ChatRoom({ roomId }: { roomId: string }) {
  const messages = useSelector((state: RootState) =>
    state.message.messages?.filter((msg: { roomId: string; content: string; id: string; userId: string }) => msg.roomId === roomId) || []
  );
  const user = useSelector((state: RootState) => state.user.user);
  const [content, setContent] = useState('');

  const sendMessage = async () => {
    if (!content.trim()) return;

    try {
      const response = await fetch(`/api/rooms/${roomId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${msg.userId === user?.id ? 'text-right' : 'text-left'}`}
          >
            <p className="inline-block bg-gray-200 p-2 rounded">
              {msg.content || ''}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
