import { AppBootstrap } from './app';

export { AppBootstrap } from './app';

// TODO: register routes, services, or handlers for the api application.

export const appName = 'api';

const bootstrap = new AppBootstrap(appName);
bootstrap.start();
