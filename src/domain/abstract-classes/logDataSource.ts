import { LogEntity, LogEntityLevel } from "../entities/log.entity";


export abstract class LogDataSource {

    abstract saveLogs(log: LogEntity): Promise<boolean>;
    abstract getLogs(severityLevel: LogEntityLevel): Promise<LogEntity[]>;
}