import Incident from '../models/incidentModel.js';
import { validateIncidentInput } from '../utils/validators.js';

// Get all incidents
export const getAllIncidents = async (req, res, next) => {
  try {
    const incidents = await Incident.find().sort({ reported_at: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    next(error);
  }
};

// Create a new incident
export const createIncident = async (req, res, next) => {
  try {
    // Validate input
    const { error, value } = validateIncidentInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Create incident
    const incident = new Incident({
      title: value.title,
      description: value.description,
      severity: value.severity
    });

    const savedIncident = await incident.save();
    res.status(201).json(savedIncident);
  } catch (error) {
    next(error);
  }
};

// Get incident by ID
export const getIncidentById = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.status(200).json(incident);
  } catch (error) {
    // If error is an invalid ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid incident ID format' });
    }
    next(error);
  }
};

// Delete incident by ID
export const deleteIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.status(204).send();
  } catch (error) {
    // If error is an invalid ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid incident ID format' });
    }
    next(error);
  }
};