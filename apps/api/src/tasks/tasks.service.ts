import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { BaseService } from 'src/commons/base.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService extends BaseService<
  Task,
  CreateTaskDto,
  UpdateTaskDto
> {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {
    super();
  }

  getModel(): Model<Task> {
    return this.taskModel;
  }

  async findByTitle(title: string): Promise<Task> {
    return await this.taskModel.findOne({ title });
  }

  async deleteAllDoneTasks(): Promise<void> {
    await this.taskModel.deleteMany({ done: true });
  }
}
