import { ENVS } from "./config/envs";
import { MongoDatabase } from "./infraestructure/databases/mongo/init";
import { MongoDataSource } from "./infraestructure/datasources/mongoDataSource";
import { NOCServer } from "./presentation/server";
import { CheckAndLog } from "./use-cases/check/check-and-log";

(async () => {
    await main().catch(error => console.error(error));
})();

async function main() {

    await MongoDatabase.connect(ENVS.MONGO_URL);
    const mongods = new MongoDataSource();

    const logger = new CheckAndLog(
        mongods,
        () => console.log('Connection is working'),
        (error) => console.log('Connection is NOT working'),
    );

    NOCServer.start('*/5 * * * * *', async () => {
        await logger.execute(ENVS.URL);
    });

}  