import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";
import { MasterValueService } from "../services/MasterValueService";
import { MasterValueServiceImpl } from "../services/implements/MasterValueServiceImpl";
import { SaveMasterValueHeaderRequest } from "../models/request/iram06/SaveMasterValueHeaderRequest";
import { MasterValueHeaderResponse } from "../models/response/iram06/MasterValueHeaderResponse";
import { SaveMasterValueDetailRequest } from "../models/request/iram06/SaveMasterValueDetailRequest";
import { MasterValueDetailResponse } from "../models/response/iram06/MasterValueDetailResponse";

@Route("iram06")
@Tags("IRAM06 - Master Value")
export class MasterValueController extends Controller {
  private masterValueService: MasterValueService;

  constructor() {
    super();
    this.masterValueService = new MasterValueServiceImpl();
  }

  @Post("/save-master-value-header-post")
  public async saveMasterValueHeaderPost(@Body() header: SaveMasterValueHeaderRequest): Promise<MasterValueHeaderResponse> {
    return await this.masterValueService.saveMasterValueHeaderPost(header);
  }

  @Post("/save-master-value-detail-post")
  public async saveMasterValueDetailPost(@Body() detail: SaveMasterValueDetailRequest): Promise<MasterValueDetailResponse> {
    return await this.masterValueService.saveMasterValueDetailPost(detail);
  }

  @Get("/find-master-value-header-get")
  public async findMasterValueHeaderGet(@Query("master-value-header-code") masterValueHeaderCode: string): Promise<MasterValueHeaderResponse | null> {
    return await this.masterValueService.findMasterValueHeaderGet(masterValueHeaderCode);
  }

  @Get("/find-master-value-detail-get")
  public async findMasterValueDetailGet(@Query("master-value-detail-code") masterValueDetailCode: string): Promise<MasterValueDetailResponse | null> {
    return await this.masterValueService.findMasterValueDetailGet(masterValueDetailCode);
  }

  @Get("/find-master-value-details-by-header-get")
  public async findMasterValueDetailsByHeaderGet(@Query("header-code") headerCode: string): Promise<MasterValueDetailResponse[] | null> {
    return await this.masterValueService.findMasterValueDetailsByHeaderGet(headerCode);
  }
}