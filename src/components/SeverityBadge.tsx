import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface Props {
  severity: string;
  size?: 'sm' | 'md' | 'lg';
}

const SeverityBadge: React.FC<Props> = ({ severity, size = 'md' }) => {
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'lg':
        return 'text-sm px-3 py-1.5';
      case 'md':
      default:
        return 'text-xs px-2.5 py-1';
    }
  };
  
  // Get severity classes and icon
  const getSeverityDetails = (severity: string) => {
    switch (severity) {
      case 'High':
        return {
          classes: 'bg-error-50 text-error-700 border-error-500 shadow-sm shadow-error-100',
          icon: <AlertTriangle className="h-3.5 w-3.5 mr-1" />
        };
      case 'Medium':
        return {
          classes: 'bg-warning-50 text-warning-700 border-warning-500 shadow-sm shadow-warning-100',
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />
        };
      case 'Low':
        return {
          classes: 'bg-success-50 text-success-700 border-success-500 shadow-sm shadow-success-100',
          icon: <Info className="h-3.5 w-3.5 mr-1" />
        };
      default:
        return {
          classes: 'bg-gray-100 text-gray-800 border-gray-300 shadow-sm shadow-gray-100',
          icon: <Info className="h-3.5 w-3.5 mr-1" />
        };
    }
  };

  const { classes, icon } = getSeverityDetails(severity);
  const sizeClasses = getSizeClasses();

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full border ${classes} ${sizeClasses} transition-all duration-200 hover:shadow-md`}
    >
      {icon}
      {severity}
    </span>
  );
};

export default SeverityBadge;