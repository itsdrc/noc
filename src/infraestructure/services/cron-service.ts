import { CronJob } from 'cron';

export type Time = string | Date;
export type Work = () => void;

export class CronService {

    public static createJob(time:Time, work:Work): CronJob {

        const job = new CronJob(time,work);
        job.start();
        return job;
    }
}