import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActivityLogsService } from "../services/ActivityLogsService";
import { ActivityLogsServiceImpl } from "../services/implements/ActivityLogsServiceImpl";
import { SaveActivityLogRequest } from "../models/request/iram07/SaveActivityLogRequest";
import { ActivityLogResponse } from "../models/response/iram07/ActivityLogResponse";

@Route("iram07")
@Tags("IRAM07 - Activity Logs")
export class ActivityLogsController extends Controller {
  private activityLogsService: ActivityLogsService;

  constructor() {
    super();
    this.activityLogsService = new ActivityLogsServiceImpl();
  }

  @Post("/save-activity-log-post")
  public async saveActivityLogPost(@Body() req: SaveActivityLogRequest): Promise<ActivityLogResponse> {
    return await this.activityLogsService.saveActivityLogPost(req);
  }
}