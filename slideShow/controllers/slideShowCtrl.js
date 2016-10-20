var app = angular.module('slide_show_app', []);

app.controller('slideShowCtrl', ['$scope', function ($scope) {

	var elementWarpper = angular.element;

	console.log(document.getElementsByClassName('slide-unit'));
	console.log(document.getElementsByClassName('slide-unit').length);

	var slideUnits = document.getElementsByClassName('slide-unit');
	var slideUnitsLength = document.getElementsByClassName('slide-unit').length;

	var unitHeight = elementWarpper(slideUnits[0]).css('height');
	console.log(unitHeight);
	console.log(slideUnits[0]);

	var unitHeight2 = slideUnits[0].style;
	console.log(unitHeight2);

}]);











































