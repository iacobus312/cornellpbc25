"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Import wallet components from OnchainKit
import { 
  Wallet, 
  ConnectWallet, 
  ConnectWalletText, 
  WalletDropdown, 
  WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet';
// Import identity components to display wallet details
import { Identity, Avatar, Name, Address, Badge } from '@coinbase/onchainkit/identity';

export default function InfluencerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const images = [
    "/images/influencer1.jpg",
    "/images/influencer2.jpg",
    "/images/influencer3.jpg",
    "/images/influencer4.jpg",
    "/images/influencer5.jpg",
    "/images/influencer6.jpg",
    "/images/influencer7.jpg",
    "/images/influencer8.jpg",
    "/images/influencer9.jpg",
    "/images/influencer10.jpg"
  ];

  // On component mount, generate a user id if not already stored.
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      const newUserId = crypto.randomUUID();
      localStorage.setItem('userId', newUserId);
      console.log("New user id generated:", newUserId);
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      router.push(`/influencer/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4 pt-32 relative bg-cover bg-center" 
      style={{ backgroundImage: 'url(/images/background.jpg)' }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Wallet and Identity display at top right */}
      <div className="absolute top-4 right-4 z-20">
        <Wallet>
          <ConnectWallet className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
            <ConnectWalletText>Connect Wallet</ConnectWalletText>
          </ConnectWallet>
          <WalletDropdown>
            <Identity hasCopyAddressOnClick>
              <Avatar className="w-8 h-8" />
              <Name>
                <Badge className="bg-green-500" />
              </Name>
              <Address className="text-sm font-bold" />
            </Identity>
            <WalletDropdownDisconnect className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition" />
          </WalletDropdown>
        </Wallet>
      </div>

      {/* Page Title */}
      <h1 className="relative text-6xl md:text-8xl font-extrabold mb-12 text-white text-center drop-shadow-lg">
        Rise or Fall <br /> 
        <span className="text-blue-400">Trade The Fame Game</span>
      </h1>

      {/* Influencer Search Input */}
      <div className="relative w-full max-w-md mb-16 z-10">
        <input
          type="text"
          placeholder="Search influencer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 text-lg text-black rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none shadow-lg"
        />
        <button 
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Scrolling Influencer Images */}
      <div className="w-full overflow-hidden relative z-10">
        <div 
          className="flex space-x-4 animate-scroll w-max" 
          style={{ width: '200%', animation: 'scroll 60s linear infinite' }}
        >
          {images.concat(images).map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`Influencer ${index + 1}`} 
              className="w-32 h-32 rounded-lg shadow-md" 
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 60s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
