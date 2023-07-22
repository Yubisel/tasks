import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TASK_TATUS } from '../entities/task.entity';

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
    default: TASK_TATUS.PENDING,
  })
  @IsOptional()
  @IsIn([TASK_TATUS.PENDING, TASK_TATUS.IN_PROGRESS, TASK_TATUS.DONE])
  status: TASK_TATUS;
}
