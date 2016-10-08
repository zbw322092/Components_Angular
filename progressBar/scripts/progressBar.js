app.directive('progressBar', function() {
	return {
		restrict: 'AE',
		scope: {
			percentage: '@',
			barHeight: '@',
			showPercetage: '@',
			// why it will throw an error if I use '=' here
			// barWidth: '='
			barWidth: '@'
		},
		templateUrl: 'progressBar.html',
		link: function(scope, element, attrs) {

		}
	}
});

app.run(['$templateCache', function($templateCache) {
	$templateCache.put('progressBar.html',
	  '<div class="progress-bar">' +
	    '<div class="progress-bar-taken" style="height:{{barHeight}}; width:{{barWidth}}" >' +
	      '<span class="percentage" ng-show={{showPercetage}} ng-bind="percentage"></span>' +
	    '</div>' +
	  '</div>'
	);
}]);