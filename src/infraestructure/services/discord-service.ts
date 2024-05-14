
export class DiscordService {

    constructor(
        public readonly discordWebHookUrl: string,
    ){}

    async notify(message: string): Promise<boolean> {

        const gifUrl = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDl3ajA0cjd4YWtkaHQybXQ1MjhhcGkzeDdwYnVjZHhnajJ5Z3hiYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7WTDH9gYo71TurPq/giphy.gif';

        const body = {
            content: message,
            embeds: [{
                image: { url: gifUrl }
            }]
        };

        const response = await fetch(this.discordWebHookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if(!response){
            console.error('Error notifyng discord');
            return false;
        }

        return true;
    }
}