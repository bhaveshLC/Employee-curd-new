export interface iEmployee {
  _id: string;
  name: string;
  email: string;
  department: string;
  salary: number;
  addedBy?: string;
}
export interface iUser {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}
