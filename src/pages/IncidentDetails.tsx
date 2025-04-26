import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Calendar } from 'lucide-react';
import { getIncidentByTitle, deleteIncident } from '../services/api';
import { Incident } from '../types';
import SeverityBadge from '../components/SeverityBadge';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';

const IncidentDetails: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchIncident = async () => {
      if (!title) {
        setError('No incident title provided');
        setLoading(false);
        return;
      }
      
      try {
        const decodedTitle = decodeURIComponent(title);
        const data = await getIncidentByTitle(decodedTitle);
        if (!data) {
          throw new Error('Incident not found');
        }
        setIncident(data);
        setLoading(false);
      } catch (err) {
        console.error('Error in fetchIncident:', err);
        setError(err instanceof Error ? err.message : 'Incident not found');
        setLoading(false);
      }
    };

    fetchIncident();
  }, [title]);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!title || !incident) return;
    
    setIsDeleting(true);

    try {
      const decodedTitle = decodeURIComponent(title);
      await deleteIncident(decodedTitle);
      navigate('/');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete incident. Please try again.');
      setIsDeleteDialogOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-error-50 border border-error-500 text-error-700 px-4 py-3 rounded">
            <p>{error || 'Incident not found'}</p>
            <Link
              to="/"
              className="mt-4 inline-flex items-center text-error-700 hover:text-error-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {incident.title}
              </h1>
              <div className="flex items-center space-x-4">
                <SeverityBadge severity={incident.severity} />
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(incident.reported_at || incident.createdAt || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleDeleteClick}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Incident
            </button>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">
              {incident.description}
            </p>
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        incidentTitle={incident.title}
      />
    </div>
  );
};

export default IncidentDetails;