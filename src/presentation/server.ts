import { CronService, Time, Work } from "../infraestructure/services/cron-service";

export class NOCServer {
    public static start(time: Time, work:Work){
        CronService.createJob(time,work);
    }
}