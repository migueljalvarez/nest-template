import config from '@/core/config/index';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
const { InitialConfigModule } = config;
@Module({
  imports: [InitialConfigModule, ApiModule],
})
export class AppModule {}
