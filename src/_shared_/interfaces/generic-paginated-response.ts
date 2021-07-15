import { GenericResponse, PaginatedData } from '.';

export class GenericPaginatedResponse<T> extends GenericResponse<
  PaginatedData<T>
> {
  data?: PaginatedData<T>;
}
