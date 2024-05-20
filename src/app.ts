import { ENVS } from "./config/envs";
import { MongoDatabase } from "./infraestructure/databases/mongo/init";
import { FileSystemDataSource, MongoDataSource, PostgreDataSource } from "./infraestructure/datasources";
import { DiscordService } from "./infraestructure/services/discord-service";
import { NOCServer } from "./presentation/server";
import { CheckAndLog } from "./use-cases/check/check-and-log";
import { DiscordNotificationController } from "./use-cases/notify-discord/controller";
import { CheckServerStatus } from "./use-cases/server/checkstatus";

(async () => {
    await main().catch(error => console.error(error));
})();

async function main() {

    await MongoDatabase.connect(ENVS.MONGO_URL);
    const mongods = new MongoDataSource();
    const filesystemds = new FileSystemDataSource();
    const postgreds = new PostgreDataSource();
    const checkServer = new CheckServerStatus(ENVS.URL);
    const discordController = new DiscordNotificationController(
        checkServer, new DiscordService(
            ENVS.DISCORD_WEBHOOK_URL,
            'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDl3ajA0cjd4YWtkaHQybXQ1MjhhcGkzeDdwYnVjZHhnajJ5Z3hiYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7WTDH9gYo71TurPq/giphy.gif'
        )
    );

    const logger = new CheckAndLog({
        serverChecker: checkServer,
        logDataSource: [filesystemds, mongods, postgreds],
        succesCallBack: () => console.log('Connection is working'),
        errorCallBack: (error) => console.log('Connection is NOT working'),
    });

    const job = async ()=>{
        await logger.execute(ENVS.URL);
        await discordController.execute();
    }

    // every 10 minutes
    NOCServer.start('0 */10 * * * *', async () => {
        await job();
    });

}  