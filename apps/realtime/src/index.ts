import { AppBootstrap } from './app';

export { AppBootstrap } from './app';

// TODO: register routes, services, or handlers for the realtime application.

export const appName = 'realtime';

const bootstrap = new AppBootstrap(appName);
bootstrap.start();
