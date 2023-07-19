import { ApiProperty } from '@nestjs/swagger';

export enum TASK_TATUS {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  @ApiProperty({
    description: 'Task id',
  })
  id: string;

  @ApiProperty({
    description: 'Task title',
  })
  title: string;

  @ApiProperty({
    description: 'Task description',
  })
  description: string;

  @ApiProperty({
    description: 'Task status',
    enum: TASK_TATUS,
  })
  status: TASK_TATUS;
}
