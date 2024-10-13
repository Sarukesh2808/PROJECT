const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
});
router.post('/', async (req, res) => {
    const { title, description, company, location, type, imageUrl } = req.body;
    const job = new Job({ title, description, company, location, type, imageUrl });
    try {
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error creating job', error: error.message });
    }
});

// Create a new job
router.post('/', async (req, res) => {
    const { title, description, company, location, type, imageUrl } = req.body;
    const job = new Job({ title, description, company, location, type, imageUrl });
    try {
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error creating job', error: error.message });
    }
});

// Apply for a job
router.post('/:id/apply', async (req, res) => {
    const jobId = req.params.id;
    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        job.applied = true; // Change applied flag to true
        await job.save();
        res.status(200).json({ message: 'Successfully applied for the job!' });
    } catch (error) {
        res.status(500).json({ message: 'Error applying for job', error: error.message });
    }
});

// Reject application
router.post('/:id/reject', async (req, res) => {
    const jobId = req.params.id;
    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        job.applied = false; // Change applied flag to false
        await job.save();
        res.status(200).json({ message: 'Application rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting job application', error: error.message });
    }
});
router.get('/applied', async (req, res) => {
    try {
        const appliedJobs = await Job.find({ applied: true });

        // if (!appliedJobs.length) {
        //     return res.status(404).json({ message: 'No jobs applied for' });
        // }

        res.json(appliedJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applied jobs', error: error.message });
    }
});

module.exports = router;
