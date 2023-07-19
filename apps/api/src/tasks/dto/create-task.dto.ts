import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
  })
  title: string;

  @ApiProperty({
    description: 'Task description',
  })
  description: string;
}
