var app = angular.module('slide_show_app', []);

app.controller('slideShowCtrl', ['$scope', function ($scope) {

	var elementWarpper = angular.element;

	// jquery
	var $slideShowDom = $(".display-area");
	var slideUnits = $slideShowDom.find('.slide-unit');
	console.log(slideUnits);


	function slideAnimation() {
		$slideShowDom.find('.slide-unit:first').animate({marginTop: '-20px'}, 1000, function() {
			window.alert('animation done');
		});
	}

	slideAnimation();


}]);











































