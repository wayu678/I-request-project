import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { RoleService } from "../services/RoleService";
import { RoleServiceImpl } from "../services/implements/RoleServiceImpl";
import { SaveRoleRequest } from "../models/request/iram07/SaveRoleRequest";
import { RoleResponse } from "../models/response/iram07/RoleResponse";

@Route("iram07")
@Tags("IRAM07 - Role")
export class RoleController extends Controller {
  private roleService: RoleService;

  constructor() {
    super();
    this.roleService = new RoleServiceImpl();
  }

  @Post("/save-role-post")
  public async saveRolePost(@Body() req: SaveRoleRequest): Promise<RoleResponse> {
    return await this.roleService.saveRolePost(req);
  }

  @Get("/find-role-by-code-get")
  public async findRoleByCodeGet(@Query("code") code: string): Promise<RoleResponse> {
    return await this.roleService.findRoleByCodeGet(code);
  }
}