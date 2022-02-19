export interface BaseUser {
  email: string;
  password: string;
}

export interface User extends BaseUser {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
