export type Player = {
  name: string;
  penality: number;
  score: Score;
};

type ScoreValue = 0 | 1 | 2 | 3;

export const scoreInputArray = [
  "20",
  "19",
  "18",
  "17",
  "16",
  "15",
  "C",
] as const;

export type ScoreInput = (typeof scoreInputArray)[number];

const scoreInputValues: Record<ScoreInput, number> = {
  "15": 15,
  "16": 16,
  "17": 17,
  "18": 18,
  "19": 19,
  "20": 20,
  C: 25,
};

export type Score = Record<ScoreInput, ScoreValue>;

export const addScore =
  (player: Player) =>
  (input: ScoreInput): Player => ({
    ...player,
    score: {
      ...player.score,
      [input]: player.score[input] === 3 ? 3 : player.score[input] + 1,
    },
  });

export const removeScore =
  (player: Player) =>
  (input: ScoreInput): Player => ({
    ...player,
    score: {
      ...player.score,
      [input]: player.score[input] === 0 ? 0 : player.score[input] - 1,
    },
  });

export const applyPenalityFromScoreInput =
  (player: Player) =>
  (input: ScoreInput): Player => ({
    ...player,
    penality:
      player.score[input] < 3
        ? player.penality + scoreInputValues[input]
        : player.penality,
  });
