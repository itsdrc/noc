import { CronJob } from 'cron';
import { CronService, Time, Work } from '../../src/infraestructure/services/cron-service';
import { NOCServer } from '../../src/presentation/server';

describe('NOCServer',()=>{

    const testFunction = jest.fn();

    test('start - should call CronService.createJob', () => {
        
        const testTime = '0 */10 * * * *';
        const createJobMock = jest.spyOn(CronService,'createJob')
            .mockImplementation((time: Time, work: Work)=> new CronJob(time,work));

        NOCServer.start(testTime, testFunction);

        expect(createJobMock).toHaveBeenCalledWith(testTime,testFunction);

    });

});
