import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { RequestDetailAddressService } from "../services/RequestDetailAddressService";
import { RequestDetailAddressServiceImpl } from "../services/implements/RequestDetailAddressServiceImpl";
import { SaveRequestDetailAddressRequest } from "../models/request/iram07/SaveRequestDetailAddressRequest";
import { RequestDetailAddressResponse } from "../models/response/iram07/RequestDetailAddressResponse";

@Route("iram07")
@Tags("IRAM07 - Request Detail Address")
export class RequestDetailAddressController extends Controller {
  private requestDetailAddressService: RequestDetailAddressService;

  constructor() {
    super();
    this.requestDetailAddressService = new RequestDetailAddressServiceImpl();
  }

  @Post("/save-request-detail-address-post")
  public async saveRequestDetailAddressPost(@Body() req: SaveRequestDetailAddressRequest): Promise<RequestDetailAddressResponse> {
    return await this.requestDetailAddressService.saveRequestDetailAddressPost(req);
  }

  @Get("/find-request-detail-address-by-header-get")
  public async findRequestDetailAddressByHeaderGet(@Query("request-header-id") requestHeaderId: number): Promise<RequestDetailAddressResponse> {
    return await this.requestDetailAddressService.findRequestDetailAddressByHeaderGet(requestHeaderId);
  }
}