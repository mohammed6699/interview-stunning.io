// Module for website sections feature
const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { WebsiteSectionsController } = require('./website-sections.controller');
const { WebsiteSectionsService } = require('./website-sections.service');
const { WebsiteSection, WebsiteSectionSchema } = require('./schemas/website-section.schema');

class WebsiteSectionsModule {}
WebsiteSectionsModule.module = {
  imports: [
    MongooseModule.forFeature([
      { name: WebsiteSection.modelName, schema: WebsiteSectionSchema },
    ]),
  ],
  controllers: [WebsiteSectionsController],
  providers: [WebsiteSectionsService],
};

module.exports = { WebsiteSectionsModule };
