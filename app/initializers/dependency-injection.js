import CurrentUser from 'priu-web/services/current-user';

export default {
    name: 'dependency-injection',
    initialize(application) {
        // Service registration
        application.register('service:current-user', CurrentUser);

        // Injections into controllers
        application.inject('controller', 'diUser', 'service:current-user');

        // Injections into routes
        application.inject('route', 'diUser', 'service:current-user');
    },
};
