'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms } from '@/redux/slices/roomSlice';
import { RootState } from '../redux/store';

export default function Rooms() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleRoomClick = (roomId: string) => {
    router.push(`/chat/${roomId}`);
  };

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
      <ul className="space-y-3">
        {rooms.map((room) => (
          <li
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            className="cursor-pointer p-4 border rounded hover:bg-gray-200"
          >
            {room.name || 'Unnamed Room'}
          </li>
        ))}
      </ul>
    </div>
  );
}
