// Mongoose schema for WebsiteSection
const mongoose = require('mongoose');

/**
 * WebsiteSection Mongoose schema definition
 */
const WebsiteSectionSchema = new mongoose.Schema({
  idea: { type: String, required: true },
  sections: { type: [String], required: true },
  timestamp: { type: Date, default: Date.now },
});

// Model name for registration
const WebsiteSection = {
  modelName: 'WebsiteSection',
};

module.exports = { WebsiteSection, WebsiteSectionSchema };
