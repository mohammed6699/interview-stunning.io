// Root module of the NestJS application
const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { WebsiteSectionsModule } = require('./website-sections/website-sections.module');

class AppModule {}
AppModule.module = {
  imports: [
    MongooseModule.forRoot('mongodb://localhost/website-sections-db'),
    WebsiteSectionsModule,
  ],
};

module.exports = { AppModule };
