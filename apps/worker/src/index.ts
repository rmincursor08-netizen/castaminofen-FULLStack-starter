import { AppBootstrap } from './app';

export { AppBootstrap } from './app';

// TODO: register routes, services, or handlers for the worker application.

export const appName = 'worker';

const bootstrap = new AppBootstrap(appName);
bootstrap.start();
