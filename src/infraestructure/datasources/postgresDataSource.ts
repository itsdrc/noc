import { SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/abstract-classes/logDataSource";
import { LogEntity, LogEntityLevel } from "../../domain/entities/log.entity";
import { prisma } from "../databases/postgres/init";

export class PostgreDataSource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {
        
        await prisma.prismaLogModel.create({
            data: log
        });
    }

    async getLogs(severityLevel: LogEntityLevel): Promise<LogEntity[]> {
                
        const logs = await prisma.prismaLogModel.findMany({
            where: {level: severityLevel},
        });

        return logs.map(LogEntity.fromObject);
    }
}