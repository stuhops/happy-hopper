import { defaultEnvironment } from './environment.default';
import { EnvironmentInterface } from './environment.model';

export const overrides: Partial<EnvironmentInterface> = {};

export const environment: EnvironmentInterface = Object.assign(defaultEnvironment, overrides);
