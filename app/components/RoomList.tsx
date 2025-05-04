'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function RoomList() {
  const rooms = useSelector((state: RootState) => state.room.rooms) as { id: string; name?: string }[];
  const router = useRouter();

  const handleRoomClick = (roomId: string) => {
    router.push(`/chat/${roomId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            className="cursor-pointer bg-gray-100 p-4 rounded hover:bg-gray-200"
          >
            {room.name || 'Unnamed Room'}
          </li>
        ))}
      </ul>
    </div>
  );
}
