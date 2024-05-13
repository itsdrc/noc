import { LogDataSource } from "../../domain/abstract-classes/logDataSource";
import { Log, LogEntity, LogEntityLevel } from "../../domain/entities/log.entity";
import { logModel } from "../databases/mongo/models/log.model";

export class MongoDataSource implements LogDataSource {

    async saveLog(log:Log) {
        await logModel.create(log);        
    }    

    async getLogs(severityLevel: LogEntityLevel): Promise<LogEntity[]> {
        const logs = await logModel.find({
            level: severityLevel
        });

        return logs.map(LogEntity.fromObject);
    }
}