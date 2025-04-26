// Validate incident input
export const validateIncidentInput = (data) => {
  const errors = [];
  const validSeverityLevels = ['Low', 'Medium', 'High'];
  
  // Check required fields
  if (!data.title || data.title.trim() === '') {
    errors.push('Title is required');
  } else if (data.title.length > 100) {
    errors.push('Title cannot be more than 100 characters');
  }
  
  if (!data.description || data.description.trim() === '') {
    errors.push('Description is required');
  }
  
  if (!data.severity) {
    errors.push('Severity is required');
  } else if (!validSeverityLevels.includes(data.severity)) {
    errors.push('Severity must be either Low, Medium, or High');
  }
  
  // If there are validation errors
  if (errors.length > 0) {
    return {
      error: {
        message: errors.join('. ')
      }
    };
  }
  
  // Return sanitized data
  return {
    value: {
      title: data.title.trim(),
      description: data.description.trim(),
      severity: data.severity
    }
  };
};