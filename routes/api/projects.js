// routes/api/projects.js

const express = require('express');
const router = express.Router();
const Project = require('../../models/Project'); // Project model
const { ensureAuth } = require('../../middleware/auth'); // Middleware to ensure user is authenticated

// Get all projects for the logged-in user
router.get('/', ensureAuth, async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user._id });
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Add a new project
router.post('/', ensureAuth, async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Authenticated User:', req.user);
    try {
        const { project, description, date } = req.body;
        const newProject = new Project({
            project,
            description,
            date,
            user: req.user._id // Ensure the user is set correctly
        });
        console.log(newProject);
        await newProject.save();
        res.json(newProject);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
