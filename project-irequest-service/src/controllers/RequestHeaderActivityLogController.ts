import { Body, Controller, Post, Route, Tags } from "tsoa";
import { RequestHeaderActivityLogService } from "../services/RequestHeaderActivityLogService";
import { RequestHeaderActivityLogServiceImpl } from "../services/implements/RequestHeaderActivityLogServiceImpl";
import { SaveRequestHeaderActivityLogRequest } from "../models/request/iram07/SaveRequestHeaderActivityLogRequest";
import { RequestHeaderActivityLogResponse } from "../models/response/iram07/RequestHeaderActivityLogResponse";

@Route("iram07")
@Tags("IRAM07 - Request Header Activity Logs")
export class RequestHeaderActivityLogController extends Controller {
  private requestHeaderActivityLogService: RequestHeaderActivityLogService;

  constructor() {
    super();
    this.requestHeaderActivityLogService = new RequestHeaderActivityLogServiceImpl();
  }

  @Post("/save-request-header-activity-log-post")
  public async saveRequestHeaderActivityLogPost(@Body() req: SaveRequestHeaderActivityLogRequest): Promise<RequestHeaderActivityLogResponse> {
    return await this.requestHeaderActivityLogService.saveRequestHeaderActivityLogPost(req);
  }
}