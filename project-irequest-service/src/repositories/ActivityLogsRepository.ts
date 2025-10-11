import { AppDataSource } from "../data-source";
import { ActivityLogs } from "../entities/ActivityLogs";

export const ActivityLogsRepository = AppDataSource.getRepository(ActivityLogs).extend({
});