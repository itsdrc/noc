import { DiscordService } from "../../infraestructure/services/discord-service";
import { CheckServerStatus } from "../server/checkstatus";


export class DiscordNotificationController {

    constructor(
        private checkServer: CheckServerStatus,
        private discordService: DiscordService,
    ){}

    async execute(){

       const statusOk = await this.checkServer.checkStatus();

        if(!statusOk)
            this.discordService.notify(`The url ${this.discordService.discordWebHookUrl} is not working`);
    }

}