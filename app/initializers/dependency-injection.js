import Global from 'priu-web/services/global';

export default {
    name: 'dependency-injection',
    initialize(application) {
        // Service registration
        application.register('service:global', Global);

        // Injections into controllers
        application.inject('controller', 'diGlobal', 'service:global');

        // Injections into routes
        application.inject('route', 'diGlobal', 'service:global');
    },
};
