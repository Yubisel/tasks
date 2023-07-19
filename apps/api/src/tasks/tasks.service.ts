import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskModel.create(createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find();
  }

  async findById(id: string): Promise<Task> {
    return await this.taskModel.findById(id);
  }

  async findByTitle(title: string): Promise<Task> {
    return await this.taskModel.findOne({ title });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
