import { DiscordService } from '../../../src/infraestructure/services/discord-service';
import { ENVS } from '../../../src/config/envs';
import { DiscordNotificationController } from '../../../src/use-cases/notify-discord/controller';
import { CheckServerStatus } from '../../../src/use-cases/server/checkstatus';


describe('DiscordNotificationController', () => {

    const discordService = new DiscordService(ENVS.DISCORD_WEBHOOK_URL);
    const checkService = new CheckServerStatus('MyUrl/test');
    const controller = new DiscordNotificationController(checkService, discordService);
    const spyOnNotify = jest.spyOn(discordService, 'notify')
        .mockImplementation((message: string) => Promise.resolve(false));

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('execute - notify discord if url fails', async () => {

        const checkStatusMock = jest.spyOn(checkService, 'checkStatus')
            .mockImplementation(()=>Promise.resolve(false));

        await controller.execute();

        expect(checkStatusMock).toHaveBeenCalledTimes(1);
        expect(spyOnNotify).toHaveBeenCalledTimes(1);

    });

    test('execute - do NOT notify discord if url is working', async () => {


        const checkStatusMock = jest.spyOn(checkService, 'checkStatus')
            .mockImplementation(() => Promise.resolve(true));

        await controller.execute();

        expect(checkStatusMock).toHaveBeenCalledTimes(1);
        expect(spyOnNotify).not.toHaveBeenCalled();

    });

});