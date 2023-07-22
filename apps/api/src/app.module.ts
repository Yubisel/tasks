import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      // 'mongodb+srv://yubiselv:C7TYjlQNvPb4SKpH@cluster0.yanizra.mongodb.net/tasks?retryWrites=true&w=majority',
      // 'mongodb://127.0.0.1:27017/tasks?directConnection=true',
      process.env.MONGODB_URI,
    ),
    ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '../../client/dist'),
      rootPath: join(__dirname, './static'),
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
