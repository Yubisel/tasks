import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'Task description',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    description: 'Task status',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  done: boolean;
}
