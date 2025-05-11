'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const Page = () => {
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getRooms = async () => {
    try {
      const res = await fetch(`/api/rooms`);
      if (!res.ok) throw new Error('Failed to fetch rooms');
      const data = await res.json();
      setRooms(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred');
      }
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <Header showBackButton={true} />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="flex flex-col space-y-3">
          {rooms
            ?.sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
            .reverse() // Reverse for descending order
            .map((room) => (
              <Link
                key={room.id}
                href={`/rooms/${room.id}`}
                className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md text-white"
              >
                {room.name || 'Unnamed Room'}
              </Link>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
