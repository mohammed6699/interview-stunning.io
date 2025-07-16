// Controller for website sections endpoints
const { WebsiteSectionsService } = require('./website-sections.service');

class WebsiteSectionsController {
  constructor(websiteSectionsService) {
    this.websiteSectionsService = websiteSectionsService;
  }

  // POST /website-sections: Generate and store sections for a website idea
  async create(req) {
    // Access body directly in JS
    const { idea } = req.body;
    const sections = await this.websiteSectionsService.generateAndStoreSections(idea);
    return { sections };
  }

  // GET /website-sections: Retrieve all stored website sections
  async findAll() {
    return await this.websiteSectionsService.findAll();
  }
}

WebsiteSectionsController.controller = {
  path: 'website-sections',
};
WebsiteSectionsController.dependencies = [WebsiteSectionsService];

module.exports = { WebsiteSectionsController };
