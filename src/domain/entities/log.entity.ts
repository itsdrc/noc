
export enum LogEntityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface Log {
    message: string,
    level: LogEntityLevel
    origin: string,
    createdAt?: Date
}

const checkProperties = (message: string, level: LogEntityLevel, origin: string) => {

    if (!message) throw new Error('message property is missing');
    if (!level) throw new Error('level property is missing');
    if (!origin) throw new Error('origin property is missing');
    // createdAt has a default value in LogEntity constructor
}

export class LogEntity {

    public message: string;
    public level: LogEntityLevel;
    public origin: string;
    public createdAt: Date;

    constructor(log: Log) {

        const { message, level, origin, createdAt = new Date() } = log;
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;
    }    

    static fromJson(jsonString: string): LogEntity {

        if (!jsonString)
            jsonString = '{}';

        const { message, level, origin, createdAt} = JSON.parse(jsonString);

        checkProperties(message, level, origin);

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt: new Date(createdAt)
        })

        return log;
    }

    static fromObject(object: { [key: string]: any }): LogEntity {

        const { message, level, origin, createdAt } = object;

        checkProperties(message,level,origin);       

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        });

        return log;
    }

}