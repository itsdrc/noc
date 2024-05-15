import { LogEntity, LogEntityLevel } from '../../../src/domain/entities/log.entity';

describe('LogEntity', () => {

    interface logObjectInterface {
        message?: string,
        level?: LogEntityLevel,
        origin?: string,
        createdAt?: Date
    }

    const logObject: logObjectInterface = {
        message: 'testmessage',
        level: LogEntityLevel.medium,
        origin: 'testfile',
        createdAt: new Date()
    };

    const logAsJson = JSON.stringify(logObject);

    test('fromObject -  should return log from json', () => {

        const log = LogEntity.fromObject(logObject);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logObject.message);
        expect(log.level).toBe(logObject.level);
        expect(log.origin).toBe(logObject.origin);
        expect(log.createdAt).toBe(logObject.createdAt);
        
    });

    test('fromObject -  should throw error if message property is missing', () => {

        const logObjectWithNoMsg = { ...logObject };
        delete logObjectWithNoMsg.message;
        expect(() => { LogEntity.fromObject(logObjectWithNoMsg) })
            .toThrow('message property is missing');
    });

    test('fromObject -  should throw error if level property is missing', () => {

        const logObjectWithNoLevel = { ...logObject };
        delete logObjectWithNoLevel.level;
        expect(() => { LogEntity.fromObject(logObjectWithNoLevel) })
            .toThrow('level property is missing');
    });

    test('fromObject -  should throw error if origin property is missing', () => {

        const logObjectWithNoOrigin = { ...logObject };
        delete logObjectWithNoOrigin.origin;
        expect(() => { LogEntity.fromObject(logObjectWithNoOrigin) })
            .toThrow('origin property is missing');
    });

    test('fromObject -  should NOT throw error if createdAt property is missing', () => {

        const logObjectWithNoDate = { ...logObject };
        delete logObjectWithNoDate.createdAt;
        expect(() => { LogEntity.fromObject(logObjectWithNoDate) }).not.toThrow();
    });

    test('fromJson - should return a log', () => {

        const log = LogEntity.fromJson(logAsJson);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logObject.message);
        expect(log.level).toBe(logObject.level);
        expect(log.origin).toBe(logObject.origin);        
        expect(log.createdAt.getTime()).toBe(logObject.createdAt?.getTime());

    });

    test('fromJson - should throw error if message property is missing',()=>{

        expect(() => { LogEntity.fromJson('') })
            .toThrow('message property is missing');
    });

    test('fromJson - should throw error if level property is missing', () => {

        const obj = {...logObject};
        delete obj.level;
        const logWithNoLevel = JSON.stringify(obj);

        expect(() => { LogEntity.fromJson(logWithNoLevel) })
            .toThrow('level property is missing');
    });

    test('fromJson - should throw error if origin property is missing', () => {

        const obj = { ...logObject };
        delete obj.origin;
        const logWithNoLevel = JSON.stringify(obj);

        expect(() => { LogEntity.fromJson(logWithNoLevel) })
            .toThrow('origin property is missing');
    });

});