import { LogDataSource } from "../../domain/abstract-classes/logDataSource";
import { LogEntity, LogEntityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath;
    private readonly allLogsPath: string;
    private readonly mediumLogsPath: string;
    private highLogsPath: string;

    constructor(foldername: string = 'logs') {
        this.logPath = foldername;
        this.allLogsPath = `${this.logPath}/low.log`;
        this.mediumLogsPath = `${this.logPath}/medium.log`;
        this.highLogsPath = `${this.logPath}/high.log`;
        this.createFolder();
    } 

    private createFolder() {

        if (!fs.existsSync(this.logPath))
            fs.mkdirSync(this.logPath);
    }

    private getLogsFromFile(path: string): LogEntity[] {

        const content = fs.readFileSync(path, 'utf-8');
        if (!content) return [];
        const logsArray = content.split('\n');
        logsArray.pop();
        const logs = logsArray.map(LogEntity.fromJson);
        return logs;
    }

    async saveLog(log: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(log)}\n`;
        fs.appendFileSync(this.allLogsPath, logAsJson);
        switch (log.level) {
            case LogEntityLevel.medium: fs.appendFileSync(this.mediumLogsPath, logAsJson);
                break;
            case LogEntityLevel.high: fs.appendFileSync(this.highLogsPath, logAsJson);
                break;
        }
    }

    async getLogs(severityLevel: LogEntityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogEntityLevel.low: return this.getLogsFromFile(this.allLogsPath);
            case LogEntityLevel.medium: return this.getLogsFromFile(this.mediumLogsPath);
            case LogEntityLevel.high: return this.getLogsFromFile(this.highLogsPath);
            default: throw new Error(`${severityLevel} not implemented`);
        }
    }

}