import { Body, Controller, Post, Route, Tags } from "tsoa";
import { UserSignatureService } from "../services/UserSignatureService";
import { UserSignatureServiceImpl } from "../services/implements/UserSignatureServiceImpl";
import { SaveUserSignatureRequest } from "../models/request/iram07/SaveUserSignatureRequest";
import { UserSignatureResponse } from "../models/response/iram07/UserSignatureResponse";

@Route("iram07")
@Tags("IRAM07 - User Signatures")
export class UserSignatureController extends Controller {
  private userSignatureService: UserSignatureService;

  constructor() {
    super();
    this.userSignatureService = new UserSignatureServiceImpl();
  }

  @Post("/save-user-signature-post")
  public async saveUserSignaturePost(@Body() req: SaveUserSignatureRequest): Promise<UserSignatureResponse> {
    return await this.userSignatureService.saveUserSignaturePost(req);
  }
}