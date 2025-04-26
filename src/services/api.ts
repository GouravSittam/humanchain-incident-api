import axios from "axios";
import { Incident, IncidentInput } from "../types";

const API_URL = "http://localhost:7777/api";

// Get all incidents
export const getIncidents = async (): Promise<Incident[]> => {
  try {
    const response = await axios.get(`${API_URL}/incidents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    throw error;
  }
};

// Get incident by title
export const getIncidentByTitle = async (title: string): Promise<Incident> => {
  try {
    // First get all incidents
    const incidents = await getIncidents();
    // Find the incident with matching title
    const incident = incidents.find(inc => inc.title === title);
    
    if (!incident) {
      throw new Error('Incident not found');
    }
    
    return incident;
  } catch (error) {
    console.error(`Error fetching incident:`, error);
    throw error;
  }
};

// Create new incident
export const createIncident = async (incidentData: IncidentInput): Promise<Incident> => {
  try {
    const response = await axios.post(`${API_URL}/incidents`, incidentData);
    return response.data;
  } catch (error) {
    console.error("Error creating incident:", error);
    throw error;
  }
};

// Delete incident
export const deleteIncident = async (title: string): Promise<void> => {
  try {
    // First get all incidents to find the correct one
    const response = await axios.get(`${API_URL}/incidents`);
    const incidents = response.data;
    
    // Find the incident with the matching title
    const incidentToDelete = incidents.find((incident: Incident) => 
      incident.title.toLowerCase() === title.toLowerCase()
    );

    if (!incidentToDelete) {
      throw new Error('Incident not found');
    }
    

    // Delete using the incident's ID
    await axios.delete(`${API_URL}/incidents/${incidentToDelete.id}`);
  } catch (error) {
    console.error('Error deleting incident:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Incident not found');
      }
      throw new Error(error.response?.data?.message || 'Failed to delete incident. Please try again.');
    }
    throw new Error('Failed to delete incident. Please try again.');
  }
};
