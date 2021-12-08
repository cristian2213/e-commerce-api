export interface ResponseUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
