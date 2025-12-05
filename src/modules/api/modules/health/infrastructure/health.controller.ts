import { LoggerProviderService } from '@/core/providers/logger';
import { Controller, Get, HttpCode, Req } from '@nestjs/common';

import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  private context: string = HealthController.name;
  constructor(
    private readonly logger: LoggerProviderService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {}
  @Get('')
  @HealthCheck()
  @HttpCode(200)
  checkHealth(@Req() req: Request) {
    this.logger.log(this.context, 'Health check endpoint called', req.method, req.url);
    // TODO: Add more health indicators as needed
    return this.health.check([() => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')]);
  }
}
