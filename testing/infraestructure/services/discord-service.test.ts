import { ENVS } from '../../../src/config/envs';
import { DiscordService } from '../../../src/infraestructure/services/discord-service';

describe('DiscordService', () => {

    const sampleUrl = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDl3ajA0cjd4YWtkaHQybXQ1MjhhcGkzeDdwYnVjZHhnajJ5Z3hiYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7WTDH9gYo71TurPq/giphy.gif';
    const discordService = new DiscordService(ENVS.DISCORD_WEBHOOK_URL, sampleUrl);

    afterEach(() => {          
        jest.restoreAllMocks();            
    });

    test('notify - fetch should be called with ...', async () => {

        const fetchMock = jest.spyOn(global, 'fetch')
            .mockResolvedValue(new Response());

        const testMessage = 'this is a test message';
        await discordService.notify(testMessage);

        expect(fetchMock).toHaveBeenCalledWith(ENVS.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: testMessage,
                embeds: [{
                    image: { url: sampleUrl }
                }]
            }),
        });
    });

    test('notify - if fetch succes should return true', async () => {

        const fetchMock = jest.spyOn(global, 'fetch')
            .mockResolvedValue(new Response())

        const ok = discordService.notify('');

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(ok).toBeTruthy();        
    });

    test('notify - if fetch fails should return false', async () => {

        const consoleErrorMock = jest.spyOn(console,'error')
        .mockImplementation(()=>{});

        const testDiscordService = new DiscordService('https://discordapp.com/api/badurl/12345',sampleUrl);

        const ok = await testDiscordService.notify('');

        expect(ok).toBe(false);
        expect(consoleErrorMock).toHaveBeenCalledTimes(1);

    });

});