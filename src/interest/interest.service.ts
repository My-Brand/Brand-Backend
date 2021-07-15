import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PaginatedData } from '../_shared_/interfaces/paginated-data';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { Interest } from './entities';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestRepo: Repository<Interest>,
  ) {}
  async create(createInterestDto: CreateInterestDto): Promise<Interest> {
    let newInterest = new Interest();
    newInterest = { ...newInterest, ...createInterestDto };
    return await this.interestRepo.save(newInterest);
  }

  async findAll(
    options: IPaginationOptions<any>,
  ): Promise<PaginatedData<Interest>> {
    return await paginate<Interest>(this.interestRepo, options, {
      order: { title: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Interest> {
    const interest = await this.interestRepo.findOne(id);
    if (!interest) throw new NotFoundException('Interest not found');
    return interest;
  }

  async update(
    id: string,
    updateInterestDto: UpdateInterestDto,
  ): Promise<Interest> {
    let interest = await this.findOne(id);
    interest = { ...interest, ...updateInterestDto };
    return await this.interestRepo.save(interest);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.interestRepo.delete(id);
    return;
  }
}
