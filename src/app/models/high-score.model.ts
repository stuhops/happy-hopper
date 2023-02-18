export interface HighScoreParams {
  name: string;
  score: number;
}

export class HighScore {
  name: string;
  score: number;

  constructor(params: HighScoreParams) {
    this.name = params.name;
    this.score = params.score;
  }
}
