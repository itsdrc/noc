
export class DiscordService {

    constructor(
        public readonly discordWebHookUrl: string,
        public readonly image:string,        
    ){}

    async notify(message: string): Promise<boolean> {

        const body = {
            content: message,
            embeds: [{
                image: { url: this.image }
            }]
        };

        const response = await fetch(this.discordWebHookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if(!response.ok){
            console.error('Error notifyng discord');
            return false;
        }

        return true;
    }
}