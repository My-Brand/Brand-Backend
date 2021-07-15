import { IPaginationMeta } from 'nestjs-typeorm-paginate';

export class PaginatedData<T> {
  items: T[];
  meta?: IPaginationMeta;
}
