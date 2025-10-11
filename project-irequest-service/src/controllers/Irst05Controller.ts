import { Controller, Post, Route, Body, Tags, Response, Path } from "@tsoa/runtime";
import { GeneralRequestService } from "../services/GeneralRequestService";
import { GeneralRequestRequest } from "../models/request/GeneralRequestRequest";
import { GeneralRequestServiceImpl } from "../services/implements/GeneralRequestServiceImpl";

import { GeneralRequestResponse } from "../models/response/GeneralRequestResponse";
import { ErrorResponse } from "../models/response/ErrorResponse";

@Route("irst05")
@Tags("IRST05 - General Request")
export class Irst05Controller extends Controller {
    private generalRequestService: GeneralRequestService;

    constructor() {
        super();
        this.generalRequestService = new GeneralRequestServiceImpl();
    }

    @Post("/create-request-post")
    public async createRequestPost(@Body() requestBody: GeneralRequestRequest): Promise<any> {
        return await this.generalRequestService.createRequestPost(requestBody);
    }
}