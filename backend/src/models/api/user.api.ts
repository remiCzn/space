export interface UserApi {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface GetUserApi {
  message: string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface PostUserApi {
  username: string;
  firstname: string;
  lastname: string;
}
