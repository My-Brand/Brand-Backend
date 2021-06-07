// export interface JwtPayload {
//   id: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   role: UserRole;
// }

export interface RestoPayload {
  id: string;
  name: string;
  active: boolean;
  addedAt: Date;
}

export class GenericResponse<T> {
  status?: number;
  message?: string;
  data?: T;
  text?: string;
}

// export class AuthResponse {
//   access_token: string;
//   userData: User;
// }
