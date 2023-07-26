import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Task title',
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Task description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Task status',
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
