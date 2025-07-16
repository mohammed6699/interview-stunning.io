/**
 * DTO for creating a website section
 * @typedef {Object} CreateWebsiteSectionDto
 * @property {string} idea - Website idea (must be non-empty)
 */

// You can use a class for validation with class-validator if needed
class CreateWebsiteSectionDto {
  /**
   * @param {string} idea
   */
  constructor(idea) {
    /** @type {string} */
    this.idea = idea;
  }
}

module.exports = { CreateWebsiteSectionDto };
