"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router =  useRouter()

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push('/login');
    } else {
      router.push('/rooms');
    }
  }, [router]);

  return <div>Loading...</div>;
}
