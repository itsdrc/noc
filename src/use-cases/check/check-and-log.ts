import { LogDataSource } from "../../domain/abstract-classes/logDataSource";
import { Log, LogEntity, LogEntityLevel } from "../../domain/entities/log.entity";
import { CheckServerStatus } from "../server/checkstatus";

export interface CheckAndLogInterface {
    serverChecker: CheckServerStatus,
    logDataSource: LogDataSource[],
    succesCallBack: () => void,
    errorCallBack: (error: string) => void,
}

export type SuccesCallBack = () => void;
export type ErrorCallBack = (error: string) => void;

export class CheckAndLog {

    private readonly serverChecker;
    private readonly logDataSource;
    private readonly succesCallBack;
    private readonly errorCallBack;

    constructor(props: CheckAndLogInterface) {

        const { serverChecker, logDataSource, succesCallBack, errorCallBack } = props;
        this.serverChecker = serverChecker;
        this.logDataSource = logDataSource;
        this.succesCallBack = succesCallBack;
        this.errorCallBack = errorCallBack;
    }

    async execute(url: string): Promise<boolean> {

        const serverStatus = await this.serverChecker.checkStatus();
        let level: LogEntityLevel;
        let message: string;
        let log: LogEntity;

        if (serverStatus) {

            message = `${url} is working`;
            level = LogEntityLevel.low;

        } else {

            message = `CANNOT ACCESS THE URL ${url}`;
            level = LogEntityLevel.high;
        }

        log = new LogEntity({
            origin: 'check-and-log.ts',
            level,
            message,
        });

        this.logDataSource.forEach(async logdatasource => await logdatasource.saveLog(log));
        serverStatus ? this.succesCallBack() : this.errorCallBack(message);
        return serverStatus;

    }

}