import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { RequestAttachedDocumentService } from "../services/RequestAttachedDocumentService";
import { RequestAttachedDocumentServiceImpl } from "../services/implements/RequestAttachedDocumentServiceImpl";
import { SaveRequestAttachedDocumentRequest } from "../models/request/iram07/SaveRequestAttachedDocumentRequest";
import { RequestAttachedDocumentResponse } from "../models/response/iram07/RequestAttachedDocumentResponse";

@Route("iram07")
@Tags("IRAM07 - Request Attached Documents")
export class RequestAttachedDocumentController extends Controller {
  private requestAttachedDocumentService: RequestAttachedDocumentService;

  constructor() {
    super();
    this.requestAttachedDocumentService = new RequestAttachedDocumentServiceImpl();
  }

  @Post("/save-request-attached-document-post")
  public async saveRequestAttachedDocumentPost(@Body() req: SaveRequestAttachedDocumentRequest): Promise<RequestAttachedDocumentResponse> {
    return await this.requestAttachedDocumentService.saveRequestAttachedDocumentPost(req);
  }

  @Get("/find-request-attached-documents-by-header-get")
  public async findRequestAttachedDocumentsByHeaderGet(@Query("request-header-id") requestHeaderId: number): Promise<RequestAttachedDocumentResponse[]> {
    return await this.requestAttachedDocumentService.findRequestAttachedDocumentsByHeaderGet(requestHeaderId);
  }
}