import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { RequestDownloadApprovalLogService } from "../services/RequestDownloadApprovalLogService";
import { RequestDownloadApprovalLogServiceImpl } from "../services/implements/RequestDownloadApprovalLogServiceImpl";
import { SaveRequestDownloadApprovalLogRequest } from "../models/request/iram07/SaveRequestDownloadApprovalLogRequest";
import { RequestDownloadApprovalLogResponse } from "../models/response/iram07/RequestDownloadApprovalLogResponse";

@Route("iram07")
@Tags("IRAM07 - Request Download Approval Logs")
export class RequestDownloadApprovalLogController extends Controller {
  private requestDownloadApprovalLogService: RequestDownloadApprovalLogService;

  constructor() {
    super();
    this.requestDownloadApprovalLogService = new RequestDownloadApprovalLogServiceImpl();
  }

  @Post("/save-request-download-approval-log-post")
  public async saveRequestDownloadApprovalLogPost(@Body() req: SaveRequestDownloadApprovalLogRequest): Promise<RequestDownloadApprovalLogResponse> {
    return await this.requestDownloadApprovalLogService.saveRequestDownloadApprovalLogPost(req);
  }

  @Get("/find-request-download-approval-log-by-id-get")
  public async findRequestDownloadApprovalLogByIdGet(@Query("id") id: number): Promise<RequestDownloadApprovalLogResponse> {
    return await this.requestDownloadApprovalLogService.findRequestDownloadApprovalLogByIdGet(id);
  }

  @Get("/find-request-download-approval-logs-by-download-log-get")
  public async findRequestDownloadApprovalLogsByDownloadLogGet(@Query("request-download-log-id") requestDownloadLogId: number): Promise<RequestDownloadApprovalLogResponse[]> {
    return await this.requestDownloadApprovalLogService.findRequestDownloadApprovalLogsByDownloadLogGet(requestDownloadLogId);
  }
}