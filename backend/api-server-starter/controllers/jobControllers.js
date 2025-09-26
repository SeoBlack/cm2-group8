const Job = require("../models/jobModel");

async function createJob(req, res) {
  console.log(req.body);
  const { title, type, location, description, salary, company } = req.body;
  if (!title || !type || !location || !description || !salary || !company) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const job = await Job.create({
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: company.name,
        description: company.description,
        contactEmail: company.contactEmail,
        contactPhone: company.contactPhone,
      },
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getJobs(req, res) {
  const { _limit } = req.query;

  const limit = _limit ? parseInt(_limit) : 10;

  try {
    const jobs = limit
      ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
      : await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid job ID format" });
    }
    res.status(500).json({ message: error.message });
  }
}

async function updateJob(req, res) {
  const id = req.params.id;
  try {
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteJob(req, res) {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };
