import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { PaginatedData } from '../_shared_/interfaces/paginated-data';
import { CreateTutorialCategoryDto } from './dto';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';
import { Tutorial, TutorialCategory } from './entities';
@Injectable()
export class TutorialService {
  constructor(
    @InjectRepository(Tutorial)
    private readonly tutorialRepo: Repository<Tutorial>,
    @InjectRepository(TutorialCategory)
    private readonly categoryRepo: Repository<TutorialCategory>,
  ) {}

  async create(createTutorialDto: CreateTutorialDto): Promise<Tutorial> {
    const category = await this.findTutorialCategory(
      createTutorialDto.categoryId,
    );
    delete createTutorialDto.categoryId;
    let newTutorial = new Tutorial();
    newTutorial = { ...newTutorial, ...createTutorialDto, category };
    return await this.tutorialRepo.save(newTutorial);
  }

  async findAll(
    options: IPaginationOptions<any>,
    categoryId?: string,
  ): Promise<PaginatedData<Tutorial>> {
    let result: PaginatedData<Tutorial>;
    if (!categoryId)
      result = await paginate<Tutorial>(this.tutorialRepo, options);
    else {
      const category = await this.findTutorialCategory(categoryId);
      result = await paginate<Tutorial>(this.tutorialRepo, options, {
        where: { category },
      });
    }
    return result;
  }

  async searchTutorials(keyword: string): Promise<Tutorial[]> {
    return await this.tutorialRepo.find({ title: ILike(`%${keyword}%`) });
  }

  async searchCategories(keyword: string): Promise<TutorialCategory[]> {
    return await this.categoryRepo.find({ title: ILike(`%${keyword}%`) });
  }

  async findOne(id: string): Promise<Tutorial> {
    const tutorial = await this.tutorialRepo.findOne(id);
    if (!tutorial) throw new NotFoundException('Tutorial not found');
    return tutorial;
  }

  async update(
    id: string,
    updateTutorialDto: UpdateTutorialDto,
  ): Promise<Tutorial> {
    let tutorial = await this.findOne(id);
    if (updateTutorialDto.categoryId) {
      const category = await this.categoryRepo.findOne(
        updateTutorialDto.categoryId,
      );
      tutorial.category = category;
      delete updateTutorialDto.categoryId;
    }
    tutorial = { ...tutorial, ...updateTutorialDto };
    await this.tutorialRepo.save(tutorial);
    return tutorial;
  }

  async remove(id: string): Promise<void> {
    const tutorial = await this.findOne(id);
    await this.tutorialRepo.delete(tutorial.id);
    return;
  }

  async findTutorialCategory(categoryId: string): Promise<TutorialCategory> {
    const tutorialCategory = await this.categoryRepo.findOne(categoryId);
    if (!tutorialCategory)
      throw new NotFoundException("Tutorial category doesn't exist");
    return tutorialCategory;
  }

  async removeCategory(id: string): Promise<null> {
    await this.findTutorialCategory(id);
    await this.categoryRepo.delete(id);
    return;
  }
  async findAllCategories(
    options: IPaginationOptions<any>,
  ): Promise<PaginatedData<TutorialCategory>> {
    return await paginate<TutorialCategory>(this.categoryRepo, options);
  }
  async createCategory(
    createTutorialCategoryDto: CreateTutorialCategoryDto,
  ): Promise<TutorialCategory> {
    let newTutorialCategory = new TutorialCategory();
    newTutorialCategory = {
      ...newTutorialCategory,
      ...createTutorialCategoryDto,
    };
    return await this.tutorialRepo.save(newTutorialCategory);
  }
}
