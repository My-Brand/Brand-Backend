export class GenericResponse<T> {
  status?: number;
  message?: string;
  data?: T;
  text?: string;
}
