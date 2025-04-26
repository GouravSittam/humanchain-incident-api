import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Incident } from '../types';
import SeverityBadge from './SeverityBadge';

interface Props {
  incident: Incident;
}

const IncidentCard: React.FC<Props> = ({ incident }) => {
  // Get severity classes
  const getSeverityClasses = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-error-50 text-error-700 border-error-500';
      case 'Medium':
        return 'bg-warning-50 text-warning-700 border-warning-500';
      case 'Low':
        return 'bg-success-50 text-success-700 border-success-500';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date error';
    }
  };

  return (
    <Link 
      to={`/incidents/${encodeURIComponent(incident.title)}`}
      className="block bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in hover:border-primary-200"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
              {incident.title}
            </h2>
          </div>
          <SeverityBadge severity={incident.severity} />
        </div>
        
        <p className="text-gray-600 line-clamp-3 mb-4">
          {incident.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(incident.reported_at || incident.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default IncidentCard;