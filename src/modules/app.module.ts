import InitialConfigModule from '@/config/initial.config.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InitialConfigModule],
})
export class AppModule {}
