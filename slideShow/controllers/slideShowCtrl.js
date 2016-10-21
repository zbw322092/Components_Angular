var app = angular.module('slide_show_app', []);

app.controller('slideShowCtrl', ['$scope', function ($scope) {

	var elementWarpper = angular.element;

	// jquery
	var $containerDom = $(".display-area");
	var slideUnits = $containerDom.find('.slide-unit');
	var unitsLength = slideUnits.length;

	var containerHeight = $containerDom.height(); // 这边用height()最好，因为css()返回的是一个string,难于计算
	console.log(containerHeight);
	var unitHeight = slideUnits.eq(0).height(); // 一开始这里写的是slideUnits[0].height()，结果报错，因为slideUnits[0]不是一个jq的DOM object.
	console.log(unitHeight);

	var maxUnitsNum = Math.ceil(containerHeight/unitHeight);
	console.log(maxUnitsNum);

	var moreUnits = maxUnitsNum/unitsLength;


	for (var i = 1; i <= moreUnits; i++) {
		$containerDom.append($containerDom.find('.slide-unit').clone());
	}


	function slideAnimation() {
		$containerDom.find('.slide-unit:first').animate({marginTop: '-20px'}, 1000, function() {			
			$(this).appendTo($containerDom).css('marginTop', 0);
			slideAnimation()
		});
	}

	slideAnimation();




}]);











































