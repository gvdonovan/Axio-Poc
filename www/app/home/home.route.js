(function () {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'home',
                config: {
                    url: '/home',
                    templateUrl: 'app/home/views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    title: 'Home',
                    settings: {
                        group: 'home',
                        top: true,
                        nav: 1,
                        content: '<i class="fa fa-home"></i> Home'
                    }
                },
            }
        ];

        return states;
    }
})();