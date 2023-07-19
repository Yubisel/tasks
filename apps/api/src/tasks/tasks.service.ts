import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASK_TATUS, Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  // Simulated db
  private tasks: Task[] = [
    {
      id: '7de0428b-4d8d-49c6-9932-ae40d85be7ea',
      title: 'some title',
      description: 'some description',
      status: TASK_TATUS.PENDING,
    },
  ];

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuidv4(),
      ...createTaskDto,
      status: TASK_TATUS.PENDING,
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findById(id: string): Task | null {
    return this.tasks.find((task) => task.id === id) || null;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findById(id);
    if (!task) {
      throw new NotFoundException(['Task not found'], {
        cause: new Error(),
        description: 'Resouce not found',
      });
    }
    const updatedTask = Object.assign(task, updateTaskDto);
    this.tasks = this.tasks.map((task) =>
      task.id === id ? updatedTask : task,
    );
    return updatedTask;
  }

  remove(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
