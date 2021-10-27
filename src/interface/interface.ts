export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface PostInterface {
  id: string;
  author: string;
  text: string;
}
