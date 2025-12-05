import SwaggerConfigModule from './openapi/swagger/swagger.config.module';
import SwaggerConfigService from './openapi/swagger/swagger.config.service';
import AppConfigModule from './app/app.config.module';
import InitialConfigModule from './initial.config.module';
import AppConfigService from './app/app.config.service';

export default {
  InitialConfigModule,
  app: { AppConfigModule, AppConfigService },
  swagger: { SwaggerConfigModule, SwaggerConfigService },
};
