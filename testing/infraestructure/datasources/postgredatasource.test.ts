import { PostgreDataSource } from '../../../src/infraestructure/datasources/postgresDataSource';
import { prisma } from '../../../src/infraestructure/databases/postgres/init';
import { LogEntity, LogEntityLevel } from '../../../src/domain/entities/log.entity';
import { fillPostgresDB, testLogs } from './helpers/fill-db';

describe('PostgreDataSource', () => {

    const postgreDataSource = new PostgreDataSource();

    afterEach(async () => {
        await prisma.prismaLogModel.deleteMany();
    });    

    test('saveLog - should save log succefully', async () => {

        await postgreDataSource.saveLog(testLogs.lowLog1);
        const newLog = (await (prisma.prismaLogModel.findMany()))
            .map(LogEntity.fromObject);

        expect([testLogs.lowLog1]).toEqual(newLog);
    });

    test('getLogs - should get the logs sucefully',async ()=>{

        await fillPostgresDB();
        const lowLogs = await postgreDataSource.getLogs(LogEntityLevel.low);
        expect(lowLogs).toEqual([
            testLogs.lowLog1,
            testLogs.lowLog2,
            testLogs.lowLog3,            
        ]);

        const mediumLogs = await postgreDataSource.getLogs(LogEntityLevel.medium);
        expect(mediumLogs).toEqual([
            testLogs.mediumLog1,
            testLogs.mediumLog2,
            testLogs.mediumLog3,
        ]);

        const highLogs = await postgreDataSource.getLogs(LogEntityLevel.high);
        expect(highLogs).toEqual([
            testLogs.highLog1,
            testLogs.highLog2,
            testLogs.highLog3,
        ]);

    });

});