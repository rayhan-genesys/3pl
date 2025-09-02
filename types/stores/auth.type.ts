export type User = {
  id: string;
  email: string;
  role: string;
};

export type AuthLoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  user: User;
};
