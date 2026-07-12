import { AppBootstrap } from './app';

export { AppBootstrap } from './app';

// TODO: register routes, services, or handlers for the admin application.

export const appName = 'admin';

const bootstrap = new AppBootstrap(appName);
bootstrap.start();
