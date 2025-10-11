import { SaveUserRequest } from "../models/request/iram07/SaveUserRequest";
import { UserResponse } from "../models/response/iram07/UserResponse";

export interface UserService {
    saveUserPost: (req: SaveUserRequest) => Promise<UserResponse>;
    findUserByUsernameGet: (username: string) => Promise<UserResponse>;
}