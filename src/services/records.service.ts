import { HighScore } from 'src/models/high-score.model';
import { environment } from 'src/environments/environment';

export class RecordsService {
  static get highScores(): HighScore[] {
    const jsonScores: string | null = localStorage.getItem(environment.highScores.key);
    if (!jsonScores) {
      this.highScores = [];
      return [];
    }
    const scores: HighScore[] = JSON.parse(jsonScores);
    return scores;
  }

  static set highScores(scores: HighScore[]) {
    localStorage.setItem(environment.highScores.key, JSON.stringify(scores));
  }

  static addHighScore(newScore: HighScore, highScores?: HighScore[]) {
    const scores: HighScore[] = highScores ?? RecordsService.highScores;
    if (!this.isHighScore(newScore.score, scores))
      throw Error('The given score is not a high score');
    if (newScore) {
      for (let i = 0; i < environment.highScores.limit; i++) {
        if (i >= scores.length) {
          scores.push(newScore);
          break;
        } else if (newScore.score > scores[i].score) {
          scores.splice(i, 0, newScore);
          if (scores.length > environment.highScores.limit) scores.pop;
          RecordsService.highScores = scores;
          break;
        }
      }
    }
  }

  static isHighScore(score: number, highScores?: HighScore[]): boolean {
    const scores: HighScore[] = highScores ?? RecordsService.highScores;
    return score > scores[scores.length].score;
  }
}
