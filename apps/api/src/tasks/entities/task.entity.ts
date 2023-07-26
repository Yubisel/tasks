import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  })
  @Prop({
    default: false,
  })
  done: boolean;

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
