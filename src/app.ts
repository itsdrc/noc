import { ENVS } from "./config/envs";
import { MongoDatabase } from "./infraestructure/databases/mongo/init";
import { FileSystemDataSource, MongoDataSource, PostgreDataSource } from "./infraestructure/datasources";
import { NOCServer } from "./presentation/server";
import { CheckAndLog } from "./use-cases/check/check-and-log";

(async () => {
    await main().catch(error => console.error(error));
})();

async function main() {

    await MongoDatabase.connect(ENVS.MONGO_URL);
    const mongods = new MongoDataSource();
    const filesystemds = new FileSystemDataSource();
    const postgreds = new PostgreDataSource();

    const logger = new CheckAndLog(
        [
            filesystemds,
            mongods,
            postgreds
        ],
        () => console.log('Connection is working'),
        (error) => console.log('Connection is NOT working'),
    );

    NOCServer.start('*/5 * * * * *', async () => {
        await logger.execute(ENVS.URL);
    });

}  