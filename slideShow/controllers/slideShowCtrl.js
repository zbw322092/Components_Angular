var app = angular.module('slide_show_app', []);

app.controller('slideShowCtrl', ['$scope', function ($scope) {

	var elementWarpper = angular.element;
	var slideGroup = 3;

	// jquery
	var $containerDom = $(".display-area");
	var slideUnits = $containerDom.find('.slide-unit');
	var unitsLength = slideUnits.length;

	var containerHeight = $containerDom.height(); // 这边用height()最好，因为css()返回的是一个string,难于计算
	console.log(containerHeight);
	var unitHeight = slideUnits.eq(0).height(); // 一开始这里写的是slideUnits[0].height()，结果报错
	console.log(unitHeight);

	var remainNum = unitsLength % slideGroup;
	var a = unitsLength, b = slideGroup, c = a % b;
	while (c != 0) {
		a = b;
		b = c;
		c = a % b;
	}

	var leastCommonMultiple = unitsLength * slideGroup / b;
	console.log(leastCommonMultiple);

	var multipleTimes = leastCommonMultiple / unitsLength;
	for (var i = 1; i < multipleTimes; i++) {
		$containerDom.append(slideUnits.clone());
	}

	var maxUnits = Math.ceil(containerHeight / unitHeight);
	var maxTimes = maxUnits / leastCommonMultiple;

	console.log(maxUnits, maxTimes);

	for (var n = 1; n < maxTimes; n++) {
		$containerDom.append(slideUnits.clone());
	}

	console.log($containerDom.find('.slide-unit').length);
	




	function slideAnimation() {
		$containerDom.find('.slide-unit:first').animate({marginTop: - unitHeight * slideGroup + 'px'}, 1000, function() {			
			$(this).appendTo($containerDom).css('marginTop', 0);
			slideAnimation()
		});
	}

	slideAnimation();




}]);











































