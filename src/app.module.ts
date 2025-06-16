import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';

import { CategoryModule } from './category/category.module';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { EnvService } from './env/env.service';
import { EnvController } from './env/env.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RelationsModule } from './relations/relations.module';
import { RelationsService } from './relations/relations.service';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    RelationsModule,
    EmployeeModule,
    ProductModule,
  ],
  controllers: [
    AppController,
    UserController,
    UserRolesController,
    ExceptionController,
    DatabaseController,
    EnvController,
  ],
  providers: [
    AppService,
    DatabaseService,
    EnvService,
    // RelationsService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
