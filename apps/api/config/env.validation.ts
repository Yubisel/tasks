import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum EnvironmentType {
  TESTING = 'testing',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

class EnvVars {
  @IsEnum(EnvironmentType)
  NODE_ENV: EnvironmentType;

  @IsNumber()
  API_PORT?: number = 3000;

  @IsString()
  MONGODB_URI: string;
}

export function validate(config: Record<string, unknown>) {
  const logger = new Logger(EnvVars.name);
  const finalConfig = plainToClass(EnvVars, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    logger.error(errors.toString());
    throw new Error();
  }

  logger.log('Environment variables loaded');
  return finalConfig;
}
