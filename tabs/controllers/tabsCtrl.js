var app = angular.module('tabs_app', []);

app.controller('tabsCtrl', ['$scope', function ($scope) {

  $scope.defaultContentDisplay = {
    tabOneContent: true,
    tabTwoContent: false,
    tabThreeContent: false,
    tabFourContent: false
  }

  function setToFalse() {
    angular.forEach($scope.defaultContentDisplay, function (value, key) {
      if (value) {
      	$scope.defaultContentDisplay[key] = false;
      }
    });
    console.log($scope.defaultContentDisplay);
  }

  $scope.showTabContent = function (tabNum) {
    switch (tabNum) {
      case 'one':
      	setToFalse();
      	$scope.defaultContentDisplay.tabOneContent = true;
        break;
      case 'two':
      	setToFalse();
      	$scope.defaultContentDisplay.tabTwoContent = true;
        break;
      case 'three':
      	setToFalse();
      	$scope.defaultContentDisplay.tabThreeContent = true;
        break;
      case 'four':
      	setToFalse();
      	$scope.defaultContentDisplay.tabFourContent = true;
        break;
      default:
      	window.alert('No Matches!');
      	break;
    }

  }

}]);










































