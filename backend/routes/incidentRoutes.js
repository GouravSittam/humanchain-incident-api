import express from "express";
import { 
  getAllIncidents, 
  createIncident, 
  getIncidentById, 
  deleteIncident 
} from "../controllers/incidentController.js";

const router = express.Router();

// GET /api/incidents - Fetch all incidents
router.get("/incidents", getAllIncidents);

// POST /api/incidents - Create a new incident
router.post("/incidents", createIncident);

// GET /api/incidents/:id - Fetch a single incident by ID
router.get("/incidents/:id", getIncidentById);

// DELETE /api/incidents/:id - Delete an incident by ID
router.delete("/incidents/:id", deleteIncident);

export default router;
