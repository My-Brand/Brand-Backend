import { Module } from '@nestjs/common';
import { TutorialService } from './tutorial.service';
import { TutorialController } from './tutorial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutorial, TutorialCategory } from './entities';
import { TutorialCategoryController } from './tutorial-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tutorial, TutorialCategory])],
  controllers: [TutorialController, TutorialCategoryController],
  providers: [TutorialService],
})
export class TutorialModule {}
