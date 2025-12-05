import { Module } from '@nestjs/common';

import { LoggerProviderModule, LoggerProviderService } from '@/core/providers/logger';
import { HealthController } from './infrastructure/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [LoggerProviderModule, TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [LoggerProviderService],
  exports: [],
})
export class HealthModule {}
