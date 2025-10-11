import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { UserService } from "../services/UserService";
import { UserServiceImpl } from "../services/implements/UserServiceImpl";
import { SaveUserRequest } from "../models/request/iram07/SaveUserRequest";
import { UserResponse } from "../models/response/iram07/UserResponse";

@Route("iram07")
@Tags("IRAM07 - Users")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserServiceImpl();
  }

  @Post("/save-user-post")
  public async saveUserPost(@Body() req: SaveUserRequest): Promise<UserResponse> {
    return await this.userService.saveUserPost(req);
  }

  @Get("/find-user-by-username-get")
  public async findUserByUsernameGet(@Query("username") username: string): Promise<UserResponse> {
    return await this.userService.findUserByUsernameGet(username);
  }
}