import { CheckServerStatus } from "../../../src/use-cases/server/checkstatus";
import { ENVS } from '../../../src/config/envs';


describe('checkServerStatus', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const checkserverStatus = new CheckServerStatus(ENVS.URL);

    test('execute- return false if fetch fails', async () => {

        const spyOnFetch = jest.spyOn(global, 'fetch')
            .mockImplementation(() => Promise.resolve(new Response()));

        const serverOk = await checkserverStatus.checkStatus();

        expect(serverOk).toBeTruthy();
    });

    test('execute- return true if fetch fails', async () => {

        const spyOnFetch = jest.spyOn(global, 'fetch')
            .mockImplementation(() => Promise.reject(new Error()));

        const serverOk = await checkserverStatus.checkStatus();

        expect(serverOk).toBeFalsy();
    });

});