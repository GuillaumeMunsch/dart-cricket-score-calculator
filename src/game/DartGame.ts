import {
  Player,
  ScoreInput,
  addScore,
  applyPenalityFromScoreInput,
  removeScore,
} from "./Player";

const findPlayer = (playersList: Player[]) => (playerName: string) => {
  const playerIndex = playersList.findIndex(({ name }) => name === playerName);

  if (playerIndex === -1) return null;

  return {
    playerIndex,
    playerName: playersList[playerIndex].name,
  };
};

export const addPlayer = (players: Player[]) => (newPlayerName: string) => {
  if (players.find(({ name }) => name === newPlayerName)) {
    throw new Error("Player already added");
  }
  const newPlayer: Player = {
    score: {
      "20": 0,
      "19": 0,
      "18": 0,
      "17": 0,
      "16": 0,
      "15": 0,
      C: 0,
    },
    name: newPlayerName,
    penality: 0,
  };
  return [...players, newPlayer];
};

export const removePlayer = (players: Player[]) => (playerName: string) => {
  const playerData = findPlayer(players)(playerName);
  if (!playerData) throw new Error("Player does not exists");
  const { playerIndex } = playerData;
  return [...players.slice(0, playerIndex), ...players.slice(playerIndex + 1)];
};

export const computeNextGameState =
  (players: Player[]) =>
  (playerName: string, input: ScoreInput, isPositive = true) => {
    const player = findPlayer(players)(playerName);

    if (!player) throw new Error("Player not found");
    const { playerIndex } = player;

    const shouldAddPenalityToRemainingPlayers =
      players[playerIndex].score[input] === 3;

    return players.map((player, index) => {
      if (index === playerIndex) {
        return isPositive
          ? addScore(players[playerIndex])(input)
          : removeScore(players[playerIndex])(input);
      }
      return isPositive && shouldAddPenalityToRemainingPlayers
        ? applyPenalityFromScoreInput(player)(input)
        : player;
    });
  };
