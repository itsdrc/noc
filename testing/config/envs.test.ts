
describe('envs', () => {

    test('envs test', async () => {

        expect(process.env.MONGO_URL).not.toBeUndefined();                                    
        expect(process.env.URL).not.toBeUndefined();
        expect(process.env.DISCORD_WEBHOOK_URL).not.toBeUndefined();
        expect(process.env.IMAGE_PATH).not.toBeUndefined();
    });

});