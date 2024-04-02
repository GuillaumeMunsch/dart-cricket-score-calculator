

type ScoreValue = 0 | 1 | 2 | 3;

export type ScoreInput = "15" | "16" | "17" | "18" | "19" | "20" | "C";

const scoreInputValues: Record<ScoreInput, number> = {
    "15": 15,
    "16": 16,
    "17": 17,
    "18": 18,
    "19": 19,
    "20": 20,
    "C": 25,
}

type Score = Record<ScoreInput, ScoreValue>;

export class Player {
    private score: Score = {
        "15": 0,
        "16": 0,
        "17": 0,
        "18": 0,
        "19": 0,
        "20": 0,
        "C": 0,
    };
    private penalityValue = 0;

    constructor(private name: string) {}

    getPlayerData = () => ({
        name: this.name,
        penality: this.penalityValue,
        score: this.score,
    })

    addScoreAndComputePenality = (input: ScoreInput) => {
        if (this.score[input] === 3) return scoreInputValues[input];
        this.score[input]++;
        return 0;
    }

    applyPenalityFromScoreInput = (input: ScoreInput) => {
        if (this.score[input] < 3) 
            this.penalityValue += scoreInputValues[input];
        }
}

