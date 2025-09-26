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
  const { search, type, location, page, _limit } = req.query;
  const skip = (page - 1) * _limit;
  const query = {};
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  if (type) {
    query.type = type;
  }
  if (location) {
    query.location = location;
  }
  try {
    const jobs = await Job.find(query).skip(skip).limit(_limit);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (error) {
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
