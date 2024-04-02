import { Player, ScoreInput } from "./Player";

const findPlayer = (playersList: Player[]) => (playerName: string) => {
        const playerIndex = playersList.findIndex((player) => {
            player.getPlayerData().name === playerName
        })
        if (playerIndex === -1) return null;
        
        return {
            playerIndex,
            playerName: playersList[playerIndex].getPlayerData().name
        }

}

export class DartGame {
    private players: Player[] = [];

    constructor() {
    }

    getGameState = () => this.players.map(({getPlayerData}) => getPlayerData())

    addPlayer = (newPlayerName: string) => {
        if (this.players.find((player) => player.getPlayerData().name === newPlayerName)) {
            throw new Error("Player already added");
        }
        this.players = [...this.players, new Player(newPlayerName)];
    }

    removePlayer = (playerName: string) => {
        const playerData = findPlayer(this.players)(playerName);
        if (!playerData) return;
        const { playerIndex } = playerData;
            this.players = [
                ...this.players.slice(0, playerIndex),
                ...this.players.slice(playerIndex + 1)
            ]
    }

    computeNextGameState = (playerName: string, input: ScoreInput) => {
        const player = findPlayer(this.players)(playerName);
        if (!player) throw new Error("Player not found");
        const { playerIndex} = player;
        const currentPlayer = this.players[playerIndex];
        const remainingPlayers = [...this.players.slice(0, playerIndex), ...this.players.slice(playerIndex + 1)];

        currentPlayer.addScoreAndComputePenality(input);
        remainingPlayers.forEach((player) => player.applyPenalityFromScoreInput(input));
    }
}