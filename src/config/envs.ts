import 'dotenv/config'
import * as env from 'env-var'

export const ENVS = {
    MONGO_URL: env.get('MONGO_URL').required().asUrlString(),
    URL: env.get('URL').required().asUrlString(),
}