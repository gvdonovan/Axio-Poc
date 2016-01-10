(function () {
    'use strict';

    var app = angular.module('app', [
        'app.core',
        'app.layout',
        'app.home',
        'app.admin'
    ]);

    app.run(['$rootScope', '$window', '$state', function($rootScope, $window, $state) {

        $rootScope.$on('$stateChangeSuccess', function(event){

            if (!$window.ga)
                return;

            $window.ga('Biff.send', 'pageview', { page: $state.current.name, client: "Biff" });
        });
    }])
})();
