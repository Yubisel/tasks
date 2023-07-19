import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

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
}
