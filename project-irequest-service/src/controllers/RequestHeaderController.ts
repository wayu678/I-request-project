import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { RequestHeaderService } from "../services/RequestHeaderService";
import { RequestHeaderServiceImpl } from "../services/implements/RequestHeaderServiceImpl";
import { SaveRequestHeaderRequest } from "../models/request/iram07/SaveRequestHeaderRequest";
import { RequestHeaderResponse } from "../models/response/iram07/RequestHeaderResponse";

@Route("iram07")
@Tags("IRAM07 - Request Header")
export class RequestHeaderController extends Controller {
  private requestHeaderService: RequestHeaderService;

  constructor() {
    super();
    this.requestHeaderService = new RequestHeaderServiceImpl();
  }

  @Post("/save-request-header-post")
  public async saveRequestHeaderPost(@Body() req: SaveRequestHeaderRequest): Promise<RequestHeaderResponse> {
    return await this.requestHeaderService.saveRequestHeaderPost(req);
  }

  @Get("/find-request-header-by-id-get")
  public async findRequestHeaderByIdGet(@Query("id") id: number): Promise<RequestHeaderResponse> {
    return await this.requestHeaderService.findRequestHeaderByIdGet(id);
  }
}