import { EnvironmentInterface } from './environment.model';

export const defaultEnvironment: EnvironmentInterface = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  version: `${require('../../package.json').version}`,
  assetPrefix: 'https://stu-resume-website.s3.us-west-1.amazonaws.com/frogger/',
  highScores: {
    key: 'frogger-scores',
    limit: 5,
  },
  controlsKey: 'frogger-controls',
};
