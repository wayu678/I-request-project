import { SaveUserSignatureRequest } from "../models/request/iram07/SaveUserSignatureRequest";
import { UserSignatureResponse } from "../models/response/iram07/UserSignatureResponse";

export interface UserSignatureService {
    saveUserSignaturePost: (req: SaveUserSignatureRequest) => Promise<UserSignatureResponse>;
}