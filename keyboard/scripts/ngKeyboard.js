app.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/ngKeyboard.html',
    '<div class="keyboard">' +
    '	<button ng-class="key.keyClass" ng-repeat="key in keysLayout" ng-click="key.func()" ng-bind="key.value">' +
    '	</button>' +
    '</div>'
  );
}]);

app.directive('ngKeyboard', ["$parse", function($parse) {
  return {
    restrict: 'AEC',
    templateUrl: 'template/ngKeyboard.html',
    // 需要实现可配置的几个功能是：
    // 1. 是否是随机键盘
    // 2. 是否在输入完成之后自动完成
    // 3. 点击每个按键的时候的行为
    // 4. 限定输入数字的个数
    scope: {
      randomStatus: "@", // whether generate random layout keyboard
      amount: "@",
      autoFinish: "@",
      inputAction: "&",
      finishAction: "&",
    },
    link: function(scope, element, attrs) {

      var keysArray = [];

      // since scope.randomStatus is a string value("false"), which will be treated as truly value. So we have to convert it
      // into boolean value using following expression
      scope.randomStatus = scope.randomStatus === 'true' ? true : false;

      scope.autoFinish = scope.randomStatus === 'true' ? true : false;

      // cannot write like this, since autoFinishStatus will be signed when js file loaded and will not change
      // when checkbox is checked or unchecked
      // var autoFinishStatus = document.getElementById('auto-finish').checked;
      // console.log(autoFinishStatus);

      // $scope.checkboxStatus = false;

      console.log(scope.inputAction);
      initKeyboard();

      // scope.safeApply = function(fn) {
      // 	var phase = this.$root.$$phase;
      // 	if (phase == '$apply' || phase == '$digest') {
      // 		if (fn && (typeof (fn) === 'function')) {
      // 			fn();
      // 		}
      // 	} else {
      // 		this.$apply(fn);
      // 	}
      // };

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
                // func: $scope.deleteKey
                func: deleteKey
              });
              continue;

            case 'done':
              keysResultArray.push({
                value: 'done',
                keyClass: 'keyboard-unit unit-f',
                // func: $scope.inputDone
                func: inputDone
              });
              break;

            default:
              keysResultArray.push({
                value: keys[i],
                keyClass: 'keyboard-unit',
                // func: $scope.addKey
                func: addKey
              });
              continue;
          }
        }
        return keysResultArray;
      }

      function initKeyboard() {
        scope.keysLayout = randomKeys(scope.randomStatus);
      }

      function canInput() {
        if (scope.amount) {
          return keysArray.length < parseInt(scope.amount, 10) ? true : false;
        }
        return true;
      }

      function updateKeyboard(value) {
        scope.inputAction({
          data: value
        });
        if (!canInput() && scope.autoFinish) {
          scope.finishAction();
        }
      }


      function addKey() {

        var clickTarget = event.target;
        console.log(clickTarget);
        var domValue = clickTarget.innerHTML;

        if (canInput()) {
          keysArray.push(domValue);
          var inputedKeys = keysArray.join(' ');

          updateKeyboard(inputedKeys);
        }
      }

      function deleteKey() {
        keysArray.pop();
        var inputedKeys = keysArray.join(' ');
        updateKeyboard(inputedKeys);
      }

      function inputDone() {
        scope.finishAction();
      }

    }
  }


}]);































