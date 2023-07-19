import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TASK_TATUS {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Schema({
  timestamps: true,
})
export class Task {
  @ApiProperty({
    description: 'Task id',
  })
  _id: string;

  @ApiProperty({
    description: 'Task title',
  })
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  title: string;

  @ApiPropertyOptional({
    description: 'Task description',
  })
  @Prop({
    trim: true,
    required: false,
    default: '',
  })
  description: string;

  @ApiProperty({
    description: 'Task status',
    enum: TASK_TATUS,
  })
  @Prop({
    default: TASK_TATUS.PENDING,
    enum: TASK_TATUS,
  })
  status: TASK_TATUS;

  @ApiProperty({
    description: 'Task create date',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Task last update date',
  })
  updatedAt: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
