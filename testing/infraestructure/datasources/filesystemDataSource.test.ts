import { FileSystemDataSource } from '../../../src/infraestructure/datasources/filesystemDataSource';
import { LogEntity, LogEntityLevel } from '../../../src/domain/entities/log.entity';
import fs, { MakeDirectoryOptions, Mode, PathLike } from 'fs';

describe('FileSystemDataSource', () => {

    const mkDirSyncMock = jest.spyOn(fs, 'mkdirSync')
        .mockImplementation(
            (path: PathLike,
                options?: | Mode | MakeDirectoryOptions | null | undefined) => undefined
        );

    const fsDataSource = new FileSystemDataSource();

    const fsAppendMock = jest.spyOn(fs, 'appendFileSync')
        .mockImplementation(() => { });

    const lowLog = new LogEntity({
        message: 'testmessage',
        level: LogEntityLevel.low,
        origin: 'test',
    });

    const mediumLog = new LogEntity({
        message: 'testmessage',
        level: LogEntityLevel.medium,
        origin: 'test',
    });

    const highLog = new LogEntity({
        message: 'testmessage',
        level: LogEntityLevel.high,
        origin: 'test',
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const rmLogsFolder = () => {
        fs.rmSync('logs', { recursive: true });
    }

    test('should create the folder if does not exists', async () => {

        const existSyncMock = jest.spyOn(fs, 'existsSync')
            .mockReturnValue(false);

        const testFileSds = new FileSystemDataSource();

        expect(existSyncMock).toHaveBeenCalledTimes(1);
        expect(mkDirSyncMock).toHaveBeenCalledTimes(1);
    });

    test('should not create the folder if exists', async () => {

        const existSyncMock = jest.spyOn(fs, 'existsSync')
            .mockReturnValue(true);

        const testFileSds = new FileSystemDataSource();

        expect(existSyncMock).toHaveBeenCalledTimes(1);
        expect(mkDirSyncMock).not.toHaveBeenCalledTimes(1);
    });

    test('saveLog - should write low-log only on logs/low.log', async () => {

        await fsDataSource.saveLog(lowLog);
        expect(fsAppendMock).toHaveBeenCalledWith(
            'logs/low.log'
            , `${JSON.stringify(lowLog)}\n`
        );
        expect(fsAppendMock).toHaveBeenCalledTimes(1);
    });

    test('saveLog - should write medium-log only on logs/medium.log', async () => {

        await fsDataSource.saveLog(mediumLog);
        expect(fsAppendMock).toHaveBeenCalledWith(
            'logs/medium.log'
            , `${JSON.stringify(mediumLog)}\n`
        );
        expect(fsAppendMock).toHaveBeenCalledTimes(1);
    });

    test('saveLog - should write high-log only on logs/high.log', async () => {

        await fsDataSource.saveLog(highLog);
        expect(fsAppendMock).toHaveBeenCalledWith(
            'logs/high.log'
            , `${JSON.stringify(highLog)}\n`
        );
        expect(fsAppendMock).toHaveBeenCalledTimes(1);
    });

    test('getLogs - should get low logs sucefully', async () => {

        jest.restoreAllMocks();

        // We need to create the logs folder first
        const datasource = new FileSystemDataSource();
        await datasource.saveLog(lowLog);
        await datasource.saveLog(lowLog);
        await datasource.saveLog(mediumLog);
        await datasource.saveLog(highLog);

        const logs = await datasource.getLogs(LogEntityLevel.low);
        expect(logs).toEqual([lowLog, lowLog]);
        rmLogsFolder();
    });

    test('getLogs - should get medium logs sucefully', async () => {

        jest.restoreAllMocks();

        // We need to create the logs folder first
        const datasource = new FileSystemDataSource();
        await datasource.saveLog(lowLog);
        await datasource.saveLog(mediumLog);
        await datasource.saveLog(mediumLog);
        await datasource.saveLog(highLog);

        const logs = await datasource.getLogs(LogEntityLevel.medium);
        expect(logs).toEqual([mediumLog, mediumLog]);
        rmLogsFolder();
    });

    test('getLogs - should get high logs sucefully', async () => {

        jest.restoreAllMocks();

        // We need to create the logs folder first
        const datasource = new FileSystemDataSource();
        await datasource.saveLog(lowLog);        
        await datasource.saveLog(mediumLog);
        await datasource.saveLog(highLog);
        await datasource.saveLog(highLog);

        const logs = await datasource.getLogs(LogEntityLevel.high);
        expect(logs).toEqual([highLog,highLog]);
        rmLogsFolder();
    });
});