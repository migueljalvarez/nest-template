import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConsoleLogger, ValidationPipe, Logger } from '@nestjs/common';
import { DEFAULT_PORT } from './common/constants';
import config from './core/config';
import interceptors from './core/interceptors/index';
import filters from './core/filters';
const { AppConfigService } = config.app;
const { SwaggerConfigService, SwaggerConfigModule } = config.swagger;
const { ResponseInterceptor } = interceptors;
const { GlobalHttpExceptionFilter } = filters;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      context: 'Main',
      timestamp: true,
      logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
    }),
  });
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const appConfig = app.get(AppConfigService);
  const swaggerConfig = app.get(SwaggerConfigService);
  if (['local', 'development'].includes(appConfig.env)) {
    const swagger = new SwaggerConfigModule(swaggerConfig);
    swagger.setup(app);
  }
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
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
