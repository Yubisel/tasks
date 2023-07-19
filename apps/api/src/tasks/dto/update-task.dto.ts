import { ApiPropertyOptional } from '@nestjs/swagger';
import { TASK_TATUS } from '../entities/task.entity';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

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
    enum: TASK_TATUS,
  })
  @IsOptional()
  @IsIn([TASK_TATUS.PENDING, TASK_TATUS.IN_PROGRESS, TASK_TATUS.DONE])
  status?: TASK_TATUS;
}
