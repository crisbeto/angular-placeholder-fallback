angular.module('demo', ['angular-placeholder-fallback'])
    .controller('demoCtrl', ['$scope', function($scope){
    	$scope.supported = !!('placeholder' in document.createElement('input'));
    }]);
