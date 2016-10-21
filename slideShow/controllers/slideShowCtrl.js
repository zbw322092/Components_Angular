var app = angular.module('slide_show_app', []);

app.controller('slideShowCtrl', ['$scope', function ($scope) {

	var elementWarpper = angular.element;
	var slideGroupLength = 4;

	// jquery
	var $containerDom = $(".display-area");
	var slideUnits = $containerDom.find('.slide-unit');
	var unitsLength = slideUnits.length;

	var containerHeight = $containerDom.height(); // 这边用height()最好，因为css()返回的是一个string,难于计算
	console.log(containerHeight);
	var unitHeight = slideUnits.eq(0).height(); // 一开始这里写的是slideUnits[0].height()，结果报错
	console.log(unitHeight);

	var remainNum = unitsLength % slideGroupLength;
	var a = unitsLength, b = slideGroupLength, c = a % b;
	while (c != 0) {
		a = b;
		b = c;
		c = a % b;
	}

	var leastCommonMultiple = unitsLength * slideGroupLength / b;
	console.log(leastCommonMultiple);

	var multipleTimes = leastCommonMultiple / unitsLength;
	for (var i = 1; i < multipleTimes; i++) {
		$containerDom.append(slideUnits.clone());
	}

	console.log(slideUnits.clone()); // 这是一个arry-like object，可以使用concat() slice()等数组方法
	console.log(slideUnits.clone().slice(0, 3));

	var maxUnits = Math.ceil(containerHeight / unitHeight);
	var maxTimes = maxUnits / leastCommonMultiple;

	console.log(maxUnits, maxTimes);

	for (var n = 1; n < maxTimes; n++) {
		$containerDom.append(slideUnits.clone());
	}

	var allSlides = $containerDom.find('.slide-unit');
	var fullLengthOfUnits = $containerDom.find('.slide-unit').length;
	console.log(allSlides);
	console.log(fullLengthOfUnits);

	console.log(allSlides.eq(0));
	console.log(allSlides.eq(0).html());
	console.log(typeof allSlides.eq(0).html());

	// var domObject = $('<div class="unit-group"></div>');
	// domObject.append(allSlides.eq(0));
	// console.log(domObject);

	
	function slideGroup() {
		var result = [];
		for (var step = 0; step < fullLengthOfUnits; step = step + slideGroupLength) {
			var item = allSlides.slice(step, step + slideGroupLength);
			var appended = '<div class="slide-group">' + $('<div />').append(item).html() +'</div>';
			console.log(appended);
			result.push(appended);
		}
		return result.join("");
	}
	
	var resultString = slideGroup();

	console.log(resultString);

	$containerDom.html(resultString);





	function slideAnimation() {
		$containerDom.find('.slide-group:first').animate({marginTop: - unitHeight * slideGroupLength + 'px'}, 1000, function() {			
			$(this).appendTo($containerDom).css('marginTop', 0);
			slideAnimation()
		});
	}

	slideAnimation();




}]);











































