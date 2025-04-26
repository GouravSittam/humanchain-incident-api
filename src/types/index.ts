// Incident interface
export interface Incident {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  reported_at?: string;
  createdAt?: string;
}

// Incident input interface
export interface IncidentInput {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}