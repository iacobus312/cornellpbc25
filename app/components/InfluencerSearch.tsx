'use client';

import { useState } from 'react';

export default function InfluencerSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="Search influencer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => console.log('Searching:', searchTerm)}>
        Search
      </button>
    </div>
  );
}
