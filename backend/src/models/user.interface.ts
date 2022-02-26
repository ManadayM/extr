export interface IBaseUser {
  email: string;
  password: string;
}

export interface IUser extends IBaseUser {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
