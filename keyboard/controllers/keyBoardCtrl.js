var app = angular.module('keyboard_app', []);


app.controller('keyboardCtrl', ['$scope', function($scope) {
  var keysArray = [];
  // cannot write like this, since autoFinishStatus will be signed when js file loaded and will not change
  // when checkbox is checked or unchecked
  // var autoFinishStatus = document.getElementById('auto-finish').checked;
  // console.log(autoFinishStatus);

  $scope.checkboxStatus = false;
  $scope.showIt = false;


  $scope.toggleKeyboard = function() {
    $scope.keysLayout = randomKeys($scope.checkboxStatus2);
    $scope.showIt = $scope.showIt === false ? true : false;
    console.log($scope.showIt);
  }

  $scope.addKey = function() {

    var clickTarget = event.target;
    console.log(clickTarget);
    var domValue = clickTarget.innerHTML;

    if (canInput()) {
      keysArray.push(domValue);
      $scope.inputedKeys = keysArray.join(' ');
      if (!canInput() && $scope.checkboxStatus) {
        $scope.showIt = false;
      }
    }
  };

  $scope.deleteKey = function() {
    keysArray.pop();
    $scope.inputedKeys = keysArray.join(' ');
  }

  $scope.inputDone = function() {
    $scope.showIt = false;
  }


  function randomKeys(status) {
    var keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    if (status) {
      keys.sort(function(a, b) {
        return Math.random() > 0.5 ? 1 : -1;
      });
    }

    keys.splice(9, 0, 'delete');
    keys.splice(11, 0, 'done');

    var keysResultArray = [];
    for (var i = 0; i < keys.length; i++) {
      // var keyClass = 'keyboard-unit' + ' ' + i;
      switch (keys[i]) {
        case 'delete':
          keysResultArray.push({
            value: 'delete',
            keyClass: 'keyboard-unit unit-f',
            func: $scope.deleteKey
          });
          continue;

        case 'done':
          keysResultArray.push({
            value: 'done',
            keyClass: 'keyboard-unit unit-f',
            func: $scope.inputDone
          });
          break;

        default:
          keysResultArray.push({
            value: keys[i],
            keyClass: 'keyboard-unit',
            func: $scope.addKey
          });
          continue;
      }
    }
    return keysResultArray;
  }


  var canInput = function() {
    if ($scope.amount) {
      return keysArray.length < parseInt($scope.amount, 10) ? true : false;
    }
    return true;
  }



}]);