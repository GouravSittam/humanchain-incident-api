import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchIncidentById } from '../services/api';

const SearchIncident: React.FC = () => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) {
      setError('Please enter an incident ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const incident = await searchIncidentById(searchId.trim());
      navigate(`/incidents/${incident.id}`);
    } catch (err) {
      setError('Incident not found. Please check the ID and try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="incidentId" className="block text-sm font-medium text-gray-700 mb-1">
            Search Incident by ID
          </label>
          <div className="relative">
            <input
              type="text"
              id="incidentId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter incident ID"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-primary-600 focus:outline-none"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-error-50 border border-error-500 text-error-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchIncident; 