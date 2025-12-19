import { IRole } from "./role.interface";

export interface UserDataType {
  userId: string;
  permission?: IRole["permissions"];
  role?: IRole;
}
