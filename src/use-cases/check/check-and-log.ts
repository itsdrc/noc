import { LogDataSource } from "../../domain/abstract-classes/logDataSource";
import { LogEntity, LogEntityLevel } from "../../domain/entities/log.entity";

export type SuccesCallBack = () => void;
export type ErrorCallBack = (error: string) => void;

export class CheckAndLog {

    constructor(
        private readonly logDataSource: LogDataSource,
        private readonly succescallback: SuccesCallBack,
        private readonly errorcallback: ErrorCallBack,
    ) { }

    async execute(url: string): Promise<boolean> {

        let level: LogEntityLevel;
        let message: string;
        let ok = false;
        let log: LogEntity;

        try {

            await fetch(url);
            message = `${url} is working`;
            level = LogEntityLevel.low;
            ok = true;

        } catch (error) {

            message = `CANNOT ACCESS THE URL ${url}`;
            level = LogEntityLevel.high;
        }

        log = new LogEntity({
            origin: 'check-and-log.ts',
            level,
            message,
        })

        await this.logDataSource.saveLog(log);
        ok ? this.succescallback() : this.errorcallback(message);
        return ok;

    }

}