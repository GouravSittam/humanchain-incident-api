import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Menu, X } from 'lucide-react';
import { getIncidentByTitle } from '../services/api';

const Navbar = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTitle.trim()) {
      setError('Please enter an incident title');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const incident = await getIncidentByTitle(searchTitle.trim());
      navigate(`/incidents/${encodeURIComponent(incident.title)}`);
    } catch (err) {
      setError('Incident not found');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Shield Incident Management
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search by title"
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
            </form> */}

            <Link
              to="/incidents/new"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Create Incident</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-primary-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search by title"
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
            </form>

            <Link
              to="/incidents/new"
              className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4 inline-block mr-2" />
              Create Incident
            </Link>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute top-16 right-0 bg-error-50 border border-error-500 text-error-700 px-4 py-2 rounded-md">
            {error}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;