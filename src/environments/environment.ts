import { EnvironmentInterface } from './environment.model';

let environmentOverride: any = undefined;
try {
  environmentOverride = require('./environment.override.ts');
} catch (err: any) {
  console.error('No overrides found');
}

/**
 * @description This is the default environment for the frogger application. If you wish to override
 * any of these fields, please create './environment.override.ts' file and export an object like so
 * 'export const environment: Partial<EnvironmentInterface> = {...overides...}'
 */
export let environment: EnvironmentInterface = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  version: `${require('../../package.json').version}`,
  assetPrefix: 'https://stu-resume-website.s3.us-west-1.amazonaws.com/frogger/',
  highScores: {
    key: 'frogger-scores',
    limit: 5,
  },
  controlsKey: 'frogger-controls',
};

environment = Object.assign(environment, environmentOverride?.environment ?? {});
