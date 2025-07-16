// Express + Mongoose backend for website sections
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/website-sections-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define WebsiteSection schema
const websiteSectionSchema = new mongoose.Schema({
  idea: { type: String, required: true },
  sections: { type: [String], required: true },
  timestamp: { type: Date, default: Date.now },
});
const WebsiteSection = mongoose.model('WebsiteSection', websiteSectionSchema);

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// POST /website-sections: Generate and store sections for a website idea
app.post('/website-sections', async (req, res) => {
  const { idea } = req.body;
  if (!idea || typeof idea !== 'string' || idea.trim() === '') {
    return res.status(400).json({ error: 'Idea is required and must be a non-empty string.' });
  }
  let sections;
  const lowerIdea = idea.toLowerCase();
  if (lowerIdea.includes('bakery')) {
    sections = ['Delicious Baked Goods', 'Our Story & Passion', 'Contact Us for Orders'];
  } else if (lowerIdea.includes('tech')) {
    sections = ['Innovative Solutions', 'Our Services', 'Get in Touch'];
  } else if (lowerIdea.includes('portfolio')) {
    sections = ['My Work', 'About Me', 'Connect'];
  } else {
    sections = ['Hero Section', 'About Us', 'Contact Information'];
  }
  const websiteSection = new WebsiteSection({ idea, sections });
  await websiteSection.save();
  res.json({ sections });
});

// GET /website-sections: Retrieve all stored website sections
app.get('/website-sections', async (req, res) => {
  const allSections = await WebsiteSection.find();
  res.json(allSections);
});

app.listen(3001, () => {
  console.log('Express server running on http://localhost:3001');
});
