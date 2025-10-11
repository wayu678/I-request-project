import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { RequestDetailService } from "../services/RequestDetailService";
import { RequestDetailServiceImpl } from "../services/implements/RequestDetailServiceImpl";
import { SaveRequestDetailRequest } from "../models/request/iram07/SaveRequestDetailRequest";
import { RequestDetailResponse } from "../models/response/iram07/RequestDetailResponse";

@Route("iram07")
@Tags("IRAM07 - Request Detail")
export class RequestDetailController extends Controller {
  private requestDetailService: RequestDetailService;

  constructor() {
    super();
    this.requestDetailService = new RequestDetailServiceImpl();
  }

  @Post("/save-request-detail-post")
  public async saveRequestDetailPost(@Body() req: SaveRequestDetailRequest): Promise<RequestDetailResponse> {
    return await this.requestDetailService.saveRequestDetailPost(req);
  }

  @Get("/find-request-detail-by-header-get")
  public async findRequestDetailByHeaderGet(@Query("request-header-id") requestHeaderId: number): Promise<RequestDetailResponse> {
    return await this.requestDetailService.findRequestDetailByHeaderGet(requestHeaderId);
  }
}