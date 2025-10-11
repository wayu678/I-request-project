import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { RequestDownloadLogService } from "../services/RequestDownloadLogService";
import { RequestDownloadLogServiceImpl } from "../services/implements/RequestDownloadLogServiceImpl";
import { SaveRequestDownloadLogRequest } from "../models/request/iram07/SaveRequestDownloadLogRequest";
import { RequestDownloadLogResponse } from "../models/response/iram07/RequestDownloadLogResponse";

@Route("iram07")
@Tags("IRAM07 - Request Download Logs")
export class RequestDownloadLogController extends Controller {
  private requestDownloadLogService: RequestDownloadLogService;

  constructor() {
    super();
    this.requestDownloadLogService = new RequestDownloadLogServiceImpl();
  }

  @Post("/save-request-download-log-post")
  public async saveRequestDownloadLogPost(@Body() req: SaveRequestDownloadLogRequest): Promise<RequestDownloadLogResponse> {
    return await this.requestDownloadLogService.saveRequestDownloadLogPost(req);
  }

  @Get("/find-request-download-log-by-id-get")
  public async findRequestDownloadLogByIdGet(@Query("id") id: number): Promise<RequestDownloadLogResponse> {
    return await this.requestDownloadLogService.findRequestDownloadLogByIdGet(id);
  }

  @Get("/find-request-download-logs-by-request-get")
  public async findRequestDownloadLogsByRequestGet(@Query("request-id") requestId: number): Promise<RequestDownloadLogResponse[]> {
    return await this.requestDownloadLogService.findRequestDownloadLogsByRequestGet(requestId);
  }
}