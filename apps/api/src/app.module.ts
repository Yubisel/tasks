import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from './health-check/health-check.module';

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
      // process.env.ENV === 'PRODUCTION'
      //   ? join(__dirname, './static')
      //   : join(__dirname, './static'),
    }),
    TasksModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
