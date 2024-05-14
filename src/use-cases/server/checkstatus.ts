

export class CheckServerStatus {

    constructor(
        private readonly serverUrl: string,
    ){}

    async checkStatus(): Promise<boolean>{

        try {
            await fetch(this.serverUrl);
            return true;
        } catch (error) {
            return false;
        }
    }
}