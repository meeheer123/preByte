// Import necessary modules
import express from 'express';
import { fetchApplications } from '../controllers/application.controller.js'; // Assuming this is the controller function for fetching applications

const router = express.Router();

// API endpoint to fetch applications
router.get('/applications', fetchApplications);

export default router;
