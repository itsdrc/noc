import { LogEntity, LogEntityLevel } from '../../../../src/domain/entities/log.entity';
import { logModel } from '../../../../src/infraestructure/databases/mongo/models/log.model';
import { prisma } from '../../../../src/infraestructure/databases/postgres/init';

export const testLogs: Readonly<{
    [key: string]: Readonly<LogEntity>;
}> = {

    lowLog1: new LogEntity({
        message: 'testLowLog1',
        level: LogEntityLevel.low,
        origin: 'testLowFile1',
    }),

    lowLog2: new LogEntity({
        message: 'testLowLog2',
        level: LogEntityLevel.low,
        origin: 'testLowFile2',
    }),

    lowLog3: new LogEntity({
        message: 'testLowLog3',
        level: LogEntityLevel.low,
        origin: 'testLowFile3',
    }),

    mediumLog1: new LogEntity({
        message: 'testMediumLog1',
        level: LogEntityLevel.medium,
        origin: 'testMediumFile1',
    }),

    mediumLog2: new LogEntity({
        message: 'testMediumLog2',
        level: LogEntityLevel.medium,
        origin: 'testMediumFile2',
    }),

    mediumLog3: new LogEntity({
        message: 'testMediumLog3',
        level: LogEntityLevel.medium,
        origin: 'testMediumFile3',
    }),

    highLog1: new LogEntity({
        message: 'testHighLog1',
        level: LogEntityLevel.high,
        origin: 'testHighFile1',
    }),

    highLog2: new LogEntity({
        message: 'testHighLog2',
        level: LogEntityLevel.high,
        origin: 'testHighFile2',
    }),

    highLog3: new LogEntity({
        message: 'testHighLog3',
        level: LogEntityLevel.high,
        origin: 'testHighFile3',
    }),
};

export const fillMongoDB = async () => {

    await logModel.create(testLogs.lowLog1);
    await logModel.create(testLogs.lowLog2);
    await logModel.create(testLogs.lowLog3);
    await logModel.create(testLogs.mediumLog1);
    await logModel.create(testLogs.mediumLog2);
    await logModel.create(testLogs.mediumLog3);
    await logModel.create(testLogs.highLog1);
    await logModel.create(testLogs.highLog2);
    await logModel.create(testLogs.highLog3);
}

export const fillPostgresDB = async ()=> {

    await prisma.prismaLogModel.create({
        data: testLogs.lowLog1
    });
    await prisma.prismaLogModel.create({
        data: testLogs.lowLog2
    });
    await prisma.prismaLogModel.create({
        data: testLogs.lowLog3
    });
    await prisma.prismaLogModel.create({
        data: testLogs.mediumLog1
    });
    await prisma.prismaLogModel.create({
        data: testLogs.mediumLog2
    });
    await prisma.prismaLogModel.create({
        data: testLogs.mediumLog3
    });
    await prisma.prismaLogModel.create({
        data: testLogs.highLog1
    });
    await prisma.prismaLogModel.create({
        data: testLogs.highLog2
    });
    await prisma.prismaLogModel.create({
        data: testLogs.highLog3
    });    
}