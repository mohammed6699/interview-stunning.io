// Service for website sections business logic
const { Injectable, Inject } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');

/**
 * @class WebsiteSectionsService
 */
class WebsiteSectionsService {
  // Use static dependencies for DI in JavaScript
  static dependencies = [InjectModel('WebsiteSection')];
  constructor(websiteSectionModel) {
    this.websiteSectionModel = websiteSectionModel;
  }

  /**
   * Simulate LLM generation and store in MongoDB
   * @param {string} idea
   * @returns {Promise<string[]>}
   */
  async generateAndStoreSections(idea) {
    // Simulate LLM output based on idea
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

    // Create and save document in MongoDB
    const websiteSection = new this.websiteSectionModel({
      idea,
      sections,
      timestamp: new Date(),
    });
    await websiteSection.save();
    return sections;
  }

  /**
   * Retrieve all stored website sections
   * @returns {Promise<Array>}
   */
  async findAll() {
    return this.websiteSectionModel.find().exec();
  }
}

module.exports = { WebsiteSectionsService };
