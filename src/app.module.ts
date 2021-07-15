import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from '../ormconfig';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionsFilter } from './_shared_/filters/exceptions.filter';
import { ResponseInterceptor } from './_shared_/interceptors/response.interceptor';
import { LoggerInterceptor } from './_shared_/interceptors/logger.interceptor';
import { SkillModule } from './skill/skill.module';
import { CompanyModule } from './company/company.module';
import { ProjectModule } from './project/project.module';
import { TutorialModule } from './tutorial/tutorial.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    SkillModule,
    CompanyModule,
    ProjectModule,
    TutorialModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
