export interface UserApi {
  userId: number;
  username: string;
}

export interface GetUserApi {
  message: string;
  username: string;
}

export interface PostUserApi {
  username: string;
}
