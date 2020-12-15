import * as signalR from "@microsoft/signalr";
console.log(signalR);

export class GameCommunication {
    private connection: signalR.HubConnection;
    private _onReceiveMessage?: (message: string) => void;
    constructor(address = "https://localhost:5001/ws") {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(address)
            .build();
        this.connection.start();
        this.connection.on("receiveMessage", (message: string) => {
            if (this._onReceiveMessage) {
                this._onReceiveMessage(message);
            }
        });
    }

    public onReceiveMessage(callback: (message: string) => void) {
        this._onReceiveMessage = callback;
    }

    public async createGame(password: string) {
        await this.connection.send("createGame", password);
    }
    public async joinGame(userName: string, password: string) {
        await this.connection.send("joinGame", userName, password);
    }
    public async sendMessage(userName: string, password: string, message: string) {
        await this.connection.send("sendMessage", userName, password, message);
    }
}