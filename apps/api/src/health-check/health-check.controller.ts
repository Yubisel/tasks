import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController {
  @Get()
  @HttpCode(200)
  healthCheck() {
    return { status: 'healthy' };
  }
}
