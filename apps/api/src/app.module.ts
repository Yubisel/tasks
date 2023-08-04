import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'config/env.validation';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from './health-check/health-check.module';
import { RequestsLoggerMiddleware } from './middleware/requests-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: !process.env.NODE_ENV
      //   ? '.env'
      //   : `.env.${process.env.NODE_ENV}`,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './static'),
    }),
    TasksModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestsLoggerMiddleware).forRoutes('*');
  }
}
