import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import type { RequestTypeService } from "../services/RequestTypeService";
import { RequestTypeServiceImpl } from "../services/implements/RequestTypeServiceImpl";
import type { SaveRequestTypeRequest } from "../models/request/iram04/SaveRequestTypeRequest";
import type { RequestTypeResponse } from "../models/response/iram04/RequestTypeResponse";

@Route("iram04")
@Tags("IRAM04 - Request Type")
export class RequestTypeController extends Controller {
  private requestTypeService: RequestTypeService;

  constructor() {
    super();
    this.requestTypeService = new RequestTypeServiceImpl();
  }

  @Post("/save-request-type-post")
  public async saveRequestTypePost(@Body() req: SaveRequestTypeRequest): Promise<RequestTypeResponse> {
    return await this.requestTypeService.saveRequestTypePost(req);
  }

  @Get("/find-request-type-by-code-get")
  public async findRequestTypeByCodeGet(@Query("code") code: string): Promise<RequestTypeResponse> {
    return await this.requestTypeService.findRequestTypeByCodeGet(code);
  }

  @Get("/find-all-request-types-get")
  public async findAllRequestTypesGet(): Promise<RequestTypeResponse[]> {
    return await this.requestTypeService.findAllRequestTypesGet();
  }
}