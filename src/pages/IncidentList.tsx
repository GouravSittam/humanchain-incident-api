import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getAllIncidents } from '../services/api';
import { Incident } from '../types';
import IncidentCard from '../components/IncidentCard';

const IncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await getAllIncidents();
        setIncidents(data);
      } catch (err) {
        setError('Failed to fetch incidents. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-500 text-error-700 px-6 py-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Incidents</h1>
        <Link
          to="/create"
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Incident
        </Link>
      </div>

      {incidents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No incidents found. Create your first incident!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentList; 