import { SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/abstract-classes/logDataSource";
import { LogEntity, LogEntityLevel } from "../../domain/entities/log.entity";
import { prisma } from "../databases/postgres/init";

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgreDataSource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {
        
        const level = severityEnum[log.level];
        await prisma.prismaLogModel.create({
            data: {
                ...log,
                level,
            }
        });
    }

    async getLogs(severityLevel: LogEntityLevel): Promise<LogEntity[]> {
        
        const level = severityEnum[severityLevel];
        const logs = await prisma.prismaLogModel.findMany({
            where: {level},
        });

        return logs.map(LogEntity.fromObject);
    }
}