import { CronJob } from 'cron';
import { CronService } from '../../../src/infraestructure/services/cron-service';

describe('CronService',()=>{    

    test('createJob - should start the work', async () => {
        
        const spyOnStart = jest.spyOn(CronJob.prototype,'start')
        .mockImplementation(()=>{});

        CronService.createJob('0 */10 * * * *',()=>{});

        expect(spyOnStart).toHaveBeenCalledTimes(1);
    });

});