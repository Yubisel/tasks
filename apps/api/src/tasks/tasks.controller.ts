import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Ceate new task
  @ApiOkResponse({
    description: 'Create new task',
    type: Task,
  })
  @ApiBadRequestResponse({
    description: 'Error creating task',
  })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    // Verify if exists others task with the same title
    const taskWithSameTitle = await this.tasksService.findByTitle(
      createTaskDto.title,
    );
    if (taskWithSameTitle) {
      throw new ConflictException('Task already exists');
    }
    try {
      return await this.tasksService.create<CreateTaskDto>(createTaskDto);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  // Return all tasks
  @ApiOkResponse({
    description: 'Get all tasks',
    type: Task,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiOkResponse({
    description: 'Get task by id',
    type: Task,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const task = await this.tasksService.findById(id);
      if (!task) throw new NotFoundException('Task not found');
      return task;
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  @ApiOkResponse({
    description: 'Update task by id',
    type: Task,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      // Verify if task exists
      const taskExists = await this.tasksService.findById(id);
      if (!taskExists) {
        throw new NotFoundException('Task not found');
      }

      // Verify if exists others task with the same title
      const taskWithSameTitle = await this.tasksService.findByTitle(
        updateTaskDto.title,
      );
      if (taskWithSameTitle && taskWithSameTitle._id.toString() !== id) {
        throw new ConflictException('Task already exists');
      }

      // update the task
      return await this.tasksService.update<UpdateTaskDto>(id, updateTaskDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiOkResponse({
    description: 'Remove task by id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      const task = await this.tasksService.delete(id);
      if (!task) throw new NotFoundException('Task not found');
      return task;
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  @ApiOkResponse({
    description: 'Remove all done task',
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllDoneTasks() {
    try {
      await this.tasksService.deleteAllDoneTasks();
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }
}
