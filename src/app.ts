import { ENVS } from "./config/envs";
import { MongoDatabase } from "./infraestructure/databases/mongo/init";


(async () => {
    await main();
})();

async function main() {
    
    await MongoDatabase.connect(ENVS.MONGO_URL);
    console.log('Connected');

}