import { Module } from '@nestjs/common';
import AppConfigModule from './app/app.config.module';
import SwaggerConfigModule from './openapi/swagger/swagger.config.module';

@Module({
  imports: [AppConfigModule, SwaggerConfigModule],
})
export default class InitialConfigModule {}
