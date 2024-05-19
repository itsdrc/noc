import { MongoDatabase } from '../../../src/infraestructure/databases/mongo/init';
import { ENVS } from '../../../src/config/envs';
import { LogEntity, LogEntityLevel } from '../../../src/domain/entities/log.entity';
import { MongoDataSource } from '../../../src/infraestructure/datasources/mongoDataSource';
import { logModel } from '../../../src/infraestructure/databases/mongo/models/log.model';
import { fillMongoDB, testLogs } from './helpers/fill-db';

describe('MongoDataSource', () => {

    beforeAll(async () => {
        await MongoDatabase.connect(ENVS.MONGO_URL);
    });

    afterAll(async () => {
        await MongoDatabase.disconnect();
    });

    afterEach(async () => {
        await logModel.deleteMany();
    });

    const mongoDataSource = new MongoDataSource();

    const testLog = new LogEntity({
        message: 'testmessafe',
        level: LogEntityLevel.medium,
        origin: 'testfile',
    });

    test('saveLog - should create the log succefully', async () => {

        await mongoDataSource.saveLog(testLog);
        const logs = await logModel.find({});
        const logsEntities = logs.map(LogEntity.fromObject)

        expect(logsEntities).toEqual([testLog]);
    });

    test('getLogs - should get the logs sucefully', async () => {

        await fillMongoDB();

        const lowLogs = await mongoDataSource.getLogs(LogEntityLevel.low);

        expect(lowLogs).toEqual([
            testLogs.lowLog1,
            testLogs.lowLog2,
            testLogs.lowLog3,
        ]);

        const mediumLogs = await mongoDataSource.getLogs(LogEntityLevel.medium);

        expect(mediumLogs).toEqual([
            testLogs.mediumLog1,
            testLogs.mediumLog2,
            testLogs.mediumLog3,
        ]);

        const highLogs = await mongoDataSource.getLogs(LogEntityLevel.high);

        expect(highLogs).toEqual([
            testLogs.highLog1,
            testLogs.highLog2,
            testLogs.highLog3,
        ]);

    });

});