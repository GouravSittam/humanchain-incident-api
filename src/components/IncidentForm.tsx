import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIncident } from '../services/api';

const IncidentForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot be more than 100 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!['Low', 'Medium', 'High'].includes(formData.severity)) {
      newErrors.severity = 'Severity must be Low, Medium, or High';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const newIncident = await createIncident(formData);
      console.log('Incident created successfully:', newIncident);
      navigate('/');
    } catch (error) {
      console.error('Error creating incident:', error);
      if (error instanceof Error) {
        setErrors({ submit: error.message || 'Failed to create incident' });
      } else {
        setErrors({ submit: 'An unexpected error occurred' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {errors.submit && (
        <div className="bg-error-50 border border-error-500 text-error-700 px-4 py-3 rounded-md">
          {errors.submit}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-error-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
            errors.title ? 'border-error-500' : 'border-gray-300'
          }`}
          placeholder="Brief summary of the incident"
        />
        {errors.title && <p className="mt-1 text-sm text-error-600">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-error-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
            errors.description ? 'border-error-500' : 'border-gray-300'
          }`}
          placeholder="Detailed description of the AI safety incident"
        />
        {errors.description && <p className="mt-1 text-sm text-error-600">{errors.description}</p>}
      </div>
      
      <div>
        <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
          Severity <span className="text-error-500">*</span>
        </label>
        <select
          id="severity"
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
            errors.severity ? 'border-error-500' : 'border-gray-300'
          }`}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.severity && <p className="mt-1 text-sm text-error-600">{errors.severity}</p>}
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Incident'}
        </button>
      </div>
    </form>
  );
};

export default IncidentForm;