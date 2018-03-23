import GlobalService from 'priu-web/services/global';
import GameService from 'priu-web/services/game';

export default {
    name: 'dependency-injection',
    initialize(application) {
        // Service registration
        application.register('service:global', GlobalService);
        application.register('service:game', GameService);

        // Injections into controllers
        application.inject('controller', 'diGlobal', 'service:global');
        application.inject('controller', 'diGame', 'service:game');

        // Injections into routes
        application.inject('route', 'diGlobal', 'service:global');
        application.inject('route', 'diGame', 'service:game');

        // Injections into models
        application.inject('model', 'diGlobal', 'service:global');

        application.inject('service:game', 'diStore', 'service:store');
        application.inject('service:game', 'diGlobal', 'service:global');
    },
};
