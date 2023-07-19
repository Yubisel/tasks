import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { ValidationError } from 'class-validator';

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
    // type:
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  // Return all tasks
  @ApiOkResponse({
    description: 'Get all tasks',
    type: Task,
    isArray: true,
  })
  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @ApiOkResponse({
    description: 'Get task by id',
    type: Task,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }

  @ApiOkResponse({
    description: 'Update task by id',
    type: Task,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOkResponse({
    description: 'Remove task by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
