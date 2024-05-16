import { CheckAndLog, CheckAndLogInterface } from '../../../src/use-cases/check/check-and-log';
import { PostgreDataSource } from '../../../src/infraestructure/datasources/postgresDataSource';
import { CheckServerStatus } from '../../../src/use-cases/server/checkstatus';
import { ENVS } from '../../../src/config/envs';
import { LogEntity, LogEntityLevel } from '../../../src/domain/entities/log.entity';

describe('checkAndLog', () => {

    const succesCallBack = jest.fn();
    const errorCallBack = jest.fn((error) => { });
    const serverChecker = new CheckServerStatus(ENVS.URL);
    const datasource = new PostgreDataSource();
    const checkAndLog = new CheckAndLog({
        serverChecker,
        logDataSource: [datasource],
        succesCallBack,
        errorCallBack,
    });

    const testurl = 'test/MyUrl';

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {

        jest.spyOn(datasource, 'saveLog')
            .mockImplementation(() => Promise.resolve());
    });

    test('execute - serverChecker.checkStatus should be called', async () => {

        const spyOnCheckServerStatus = jest.spyOn(serverChecker, 'checkStatus')
            .mockReturnValue(Promise.resolve(true));

        await checkAndLog.execute(testurl);

        expect(spyOnCheckServerStatus).toHaveBeenCalledTimes(1);
    });

    test('execute - succesCallBack should be called if checkStatus returns true', async () => {

        const spyOnCheckServerStatus = jest.spyOn(serverChecker, 'checkStatus')
            .mockReturnValue(Promise.resolve(true));

        await checkAndLog.execute(testurl);

        expect(spyOnCheckServerStatus).toHaveBeenCalledTimes(1);
        expect(succesCallBack).toHaveBeenCalledTimes(1);
    });

    test('execute - errorCallBack should be called if checkStatus returns false', async () => {

        const spyOnCheckServerStatus = jest.spyOn(serverChecker, 'checkStatus')
            .mockReturnValue(Promise.resolve(false));

        await checkAndLog.execute(testurl);

        expect(spyOnCheckServerStatus).toHaveBeenCalledTimes(1);
        expect(errorCallBack).toHaveBeenCalledTimes(1);
    });

    test('execute - should call saveLog for each datasource', async () => {

        const dataSource1 = new PostgreDataSource();
        const dataSource2 = new PostgreDataSource();
        const dataSource3 = new PostgreDataSource();

        const ds1SaveLogSpy = jest.spyOn(dataSource1, 'saveLog')
            .mockImplementation(() => Promise.resolve());
        const ds2SaveLogSpy = jest.spyOn(dataSource2, 'saveLog')
            .mockImplementation(() => Promise.resolve());
        const ds3SaveLogSpy = jest.spyOn(dataSource3, 'saveLog')
            .mockImplementation(() => Promise.resolve());

        const dataSourceArray = [dataSource1, dataSource2, dataSource3];
        const testCheckAndLog = new CheckAndLog({
            serverChecker,
            logDataSource: dataSourceArray,
            succesCallBack,
            errorCallBack,
        });

        await testCheckAndLog.execute(testurl);

        expect(ds1SaveLogSpy).toHaveBeenCalledTimes(1);
        expect(ds2SaveLogSpy).toHaveBeenCalledTimes(1);
        expect(ds3SaveLogSpy).toHaveBeenCalledTimes(1);
    });

    test('execute - should return true if url is ok', async () => {

        const spyOnCheckServerStatus = jest.spyOn(serverChecker, 'checkStatus')
            .mockReturnValue(Promise.resolve(true));

        const urlIsWorking = await checkAndLog.execute(testurl);

        expect(spyOnCheckServerStatus).toHaveBeenCalledTimes(1);
        expect(urlIsWorking).toBeTruthy();
    });

    test('execute - should return true if url is not working', async () => {

        const spyOnCheckServerStatus = jest.spyOn(serverChecker, 'checkStatus')
            .mockReturnValue(Promise.resolve(false));

        const urlIsWorking = await checkAndLog.execute(testurl);

        expect(spyOnCheckServerStatus).toHaveBeenCalledTimes(1);
        expect(urlIsWorking).toBeFalsy();

    });

    test('execute - should save a low-level log if url is ok', async () => {

        const spyOnCheckServerStatus = jest.spyOn(serverChecker, 'checkStatus')
            .mockReturnValue(Promise.resolve(true));

        const saveLogSpy = jest.spyOn(datasource, 'saveLog')
            .mockImplementation(() => Promise.resolve());

        await checkAndLog.execute(testurl);

        expect(spyOnCheckServerStatus).toHaveBeenCalledTimes(1);
        expect(saveLogSpy).toHaveBeenCalledWith
            (expect.objectContaining({ level: LogEntityLevel.low }))

    });

    test('execute - should save a high-level log if url is not working', async () => {

        const spyOnCheckServerStatus = jest.spyOn(serverChecker, 'checkStatus')
            .mockReturnValue(Promise.resolve(false));

        const saveLogSpy = jest.spyOn(datasource, 'saveLog')
            .mockImplementation(() => Promise.resolve());

        await checkAndLog.execute(testurl);

        expect(spyOnCheckServerStatus).toHaveBeenCalledTimes(1);
        expect(saveLogSpy).toHaveBeenCalledWith
            (expect.objectContaining({ level: LogEntityLevel.high }))

    });
});