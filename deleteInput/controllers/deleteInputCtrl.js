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
  var wrappedInputDom = angular.element(inputDom);
  console.log(inputDom);
  console.log(wrappedInputDom);
  console.log(wrappedInputDom === inputDom); // false
  console.log(wrappedInputDom == inputDom); // false
  // wrappedInputDom的__proto__里面包含了jqLite中定义方法，而inputDOM中没有，它的__proto__是HTMLCollection

  var closeDom = document.getElementsByClassName('close-icon');
  var wrappedCloseDom = angular.element(closeDom);
  console.log(wrappedCloseDom);



  wrappedInputDom.on('keyup focus', function () {
    $timeout(function () {
      if ($scope.inputValue) {
        $scope.showClose = true;
      } else {
        $scope.showClose = false;
      }
    });
  });

  wrappedInputDom.on('blur', function () {
    $timeout(function () {
      $scope.showClose = false;
    })
  });

  // another method which can reach the same goal of using $timeout is using $apply
  // wrappedInputDom.on('blur', function () {
  //   $scope.$apply($scope.showClose = false);
  // });
  // $scope.$apply works fine until I have to add clearInput function to the close icon,
  // since onblur event will be triggeed firstly and the close icon will be hidden, the ng-click 
  // function will not be triggered and the inputted content will not be deleted. However, the timeout 
  // will solve all of the problem.

  $scope.clearInput = function() {
  	$scope.inputValue = '';
  	$scope.showClose = false;
  }

}]);







