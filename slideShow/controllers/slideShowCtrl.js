var app = angular.module('slide_show_app', []);

app.controller('slideShowCtrl', ['$scope', function ($scope) {

	var elementWarpper = angular.element;

	// jquery
	var $slideShowDom = $(".display-area");
	var slideUnits = $slideShowDom.find('.slide-unit');
	console.log(slideUnits);


	function slideAnimation() {
		$slideShowDom.find('.slide-unit:first').animate({marginTop: '-20px'}, 1000, function() {			
			$(this).appendTo($slideShowDom).css('marginTop', 0);
			slideAnimation()
		});
	}

	slideAnimation();

	function appendFunc() {
		$('.test-line').appendTo('.append-to-me');	
	}
	
	$scope.clickMe = appendFunc;

}]);











































