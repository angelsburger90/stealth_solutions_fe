export enum TAppPage {
  ALL = "*",
  ROOT = "/",
  USER_DETAILS_PAGE = "/userDetailsPage",
}

export interface TUserAuth {
  userId: string;
  password: string;
  rememberMe?: boolean;
}

export interface TAuthResponse {
  access_token: string;
  token_type: string;
  user: TUser;
}

export interface TUser {
  id: number;
  name: string;
  username?: string;
  password?: string;
  email: string;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
}
