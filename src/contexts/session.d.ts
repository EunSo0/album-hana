type LoginUser = {
  id: number;
  name: string;
  username: string;
};
type Session = {
  loginUser: LoginUser | null;
};
