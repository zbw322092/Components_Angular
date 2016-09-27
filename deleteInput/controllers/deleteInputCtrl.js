var app = angular.module('delete_input_app', []);

app.controller('deleteInputCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

  // 再一次注意，下面inputValueLength这个变量在被赋值一次之后当$scope.inputValue变化的时候它不会再实时的被更新
  // var inputValueLength = $scope.inputValue || '';
  // $scope.showClose = inputValueLength.length == 0 ? false: true;

  // 注意，在这里面定义的onblur事件触发的函数是不会被调用到的，只有在app.controller外面定义才会被调用到
  // function onblurAction() {
  // 	window.alert('Onblur!');
  // }

  var inputDom = document.getElementsByClassName('input-field');
  var wrappedDom = angular.element(inputDom);
  console.log(inputDom);
  console.log(wrappedDom);
  console.log(wrappedDom === inputDom); // false
  console.log(wrappedDom == inputDom); // false
  // wrappedDom的__proto__里面包含了jqLite中定义方法，而inputDOM中没有，它的__proto__是HTMLCollection

  wrappedDom.on('keyup focus', function () {
  	$timeout(function() {
	  	if($scope.inputValue) {
	  		$scope.showClose = true;
	  	} else {
	  		$scope.showClose = false;
	  	}
  	});
  });

  // wrappedDom.on('blur', function () {

  // })

}]);
