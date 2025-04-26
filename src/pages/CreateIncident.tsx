import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import IncidentForm from '../components/IncidentForm';

const CreateIncident: React.FC = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to List</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Report New Incident</h1>
          <p className="text-gray-600 mt-1">
            Complete the form below to report a new AI safety incident
          </p>
        </div>
        
        <div className="p-6">
          <IncidentForm />
        </div>
      </div>
    </div>
  );
};

export default CreateIncident;