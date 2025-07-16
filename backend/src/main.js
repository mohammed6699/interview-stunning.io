// Entry point of the NestJS application
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');
const { ValidationPipe } = require('@nestjs/common');

async function bootstrap() {
  // Create the NestJS app
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend at http://localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  // Apply global validation pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // Start the server on port 3001
  await app.listen(3001);
  console.log('NestJS server running on http://localhost:3001');
}
bootstrap();
