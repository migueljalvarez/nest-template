import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConsoleLogger, ValidationPipe, Logger } from '@nestjs/common';
import { AppConfigService } from './config/app/app.config.service';
import { DEFAULT_PORT } from './common/constants';
import { SwaggerConfigService } from './config/openapi/swagger/swagger.config.service';
import { SwaggerConfigModule } from './config/openapi/swagger/swagger.config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'NEST TEMPLATE', // Change for current name application
      context: 'Main',
      timestamp: true,
      logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
    }),
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  

  const appConfig: AppConfigService = app.get(AppConfigService);
  const swaggerConfig: SwaggerConfigService = app.get(SwaggerConfigService);
  if (['local', 'development'].includes(appConfig.env)) {
    const swagger: SwaggerConfigModule = new SwaggerConfigModule(swaggerConfig);
    swagger.setup(app);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(appConfig.port ?? DEFAULT_PORT);
}

bootstrap()
  .then(() => {
    const { APP_PORT } = process.env;
    Logger.log(`Server running on port ${APP_PORT}`);
  })
  .catch((error) => {
    Logger.error('Error starting server', error);
  });
