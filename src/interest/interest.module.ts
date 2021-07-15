import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Interest])],
  controllers: [InterestController],
  providers: [InterestService],
})
export class InterestModule {}
