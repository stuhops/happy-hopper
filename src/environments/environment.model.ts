export interface EnvironmentInterface {
  assetPrefix: 'assets/' | string;
  highScores: {
    key: 'frogger-scores' | string;
    limit: 5 | number;
  };
  controlsKey: 'frogger-controls' | string;
}
