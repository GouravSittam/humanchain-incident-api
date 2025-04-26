import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate that the input is a number
    if (!/^\d+$/.test(searchId)) {
      setError('Please enter a valid incident number (e.g., 1, 2, 3...)');
      return;
    }

    const id = parseInt(searchId, 10);
    if (id <= 0) {
      setError('Please enter a positive number');
      return;
    }

    // Navigate to the incident details page
    navigate(`/incidents/${id}`);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter incident number (e.g., 1, 2, 3...)"
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        <div className="mt-2 text-sm text-gray-500">
          <p>Enter an incident number to view its details</p>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 