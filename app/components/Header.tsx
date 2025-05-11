'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = ({ showBackButton = false }: { showBackButton?: boolean }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
      const user = localStorage.getItem('user');      
      if(user){
        setIsLoggedIn(true);
      }
      else{
        router.push("/login")
      }
    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false); 
    router.push('/login');
  };
  

  return (
    <div className="flex items-center p-4 bg-gray-800 text-white shadow-lg">
          {showBackButton && isLoggedIn && (
            <button
              onClick={() => router.back()}
              className="flex items-center  cursor-pointer space-x-2 text-gray-300 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>
          )}
          <h1 className="text-lg font-semibold mx-auto">Chat App</h1>
         {isLoggedIn &&  <button
            onClick={handleLogout}
            className="text-gray-300 cursor-pointer hover:text-white text-sm ml-auto"
          >
            Logout
          </button> }
    </div>
  );
};

export default Header;
