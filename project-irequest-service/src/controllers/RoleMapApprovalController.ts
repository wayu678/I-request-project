import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { RoleMapApprovalService } from "../services/RoleMapApprovalService";
import { RoleMapApprovalServiceImpl } from "../services/implements/RoleMapApprovalServiceImpl";
import { SaveRoleMapApprovalHeaderRequest } from "../models/request/iram07/SaveRoleMapApprovalHeaderRequest";
import { SaveRoleMapApprovalDetailRequest } from "../models/request/iram07/SaveRoleMapApprovalDetailRequest";
import { SaveRequestTypeRequest } from "../models/request/iram04/SaveRequestTypeRequest";
import { RoleMapApprovalHeaderResponse } from "../models/response/iram07/RoleMapApprovalHeaderResponse";
import { RoleMapApprovalDetailResponse } from "../models/response/iram07/RoleMapApprovalDetailResponse";
import { RequestTypeResponse } from "../models/response/iram04/RequestTypeResponse";

@Route("iram07")
@Tags("IRAM07 - Role Map Approval")
export class RoleMapApprovalController extends Controller {
  private roleMapApprovalService: RoleMapApprovalService;

  constructor() {
    super();
    this.roleMapApprovalService = new RoleMapApprovalServiceImpl();
  }

  @Post("/save-role-map-approval-header-post")
  public async saveRoleMapApprovalHeaderPost(@Body() header: SaveRoleMapApprovalHeaderRequest): Promise<RoleMapApprovalHeaderResponse> {
    return await this.roleMapApprovalService.saveRoleMapApprovalHeaderPost(header);
  }

  @Post("/save-role-map-approval-detail-post")
  public async saveRoleMapApprovalDetailPost(@Body() detail: SaveRoleMapApprovalDetailRequest): Promise<RoleMapApprovalDetailResponse> {
    return await this.roleMapApprovalService.saveRoleMapApprovalDetailPost(detail);
  }

  @Post("/save-request-type-post")
  public async saveRequestTypePost(@Body() req: SaveRequestTypeRequest): Promise<RequestTypeResponse> {
    return await this.roleMapApprovalService.saveRequestTypePost(req);
  }

  @Get("/find-role-map-approval-header-get")
  public async findRoleMapApprovalHeaderGet(
    @Query("request-type-code") requestTypeCode: string,
    @Query("campus-code") campusCode?: string,
    @Query("faculty-code") facultyCode?: string,
    @Query("major-code") majorCode?: string,
    @Query("section") section?: string,
  ): Promise<RoleMapApprovalHeaderResponse> {
    return await this.roleMapApprovalService.findRoleMapApprovalHeaderGet(requestTypeCode, campusCode, facultyCode, majorCode, section);
  }

  @Get("/find-role-map-approval-detail-get")
  public async findRoleMapApprovalDetailGet(@Query("id") id: number): Promise<RoleMapApprovalDetailResponse> {
    return await this.roleMapApprovalService.findRoleMapApprovalDetailGet(id);
  }

  @Get("/find-role-map-approval-details-by-header-get")
  public async findRoleMapApprovalDetailsByHeaderGet(@Query("header-id") headerId: number): Promise<RoleMapApprovalDetailResponse[]> {
    return await this.roleMapApprovalService.findRoleMapApprovalDetailsByHeaderGet(headerId);
  }

  @Get("/find-request-type-by-code-get")
  public async findRequestTypeByCodeGet(@Query("code") code: string): Promise<RequestTypeResponse> {
    return await this.roleMapApprovalService.findRequestTypeByCodeGet(code);
  }
}