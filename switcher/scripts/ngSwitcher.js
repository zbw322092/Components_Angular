// 明确要实现的功能：
// 1. 点击实现状态的切换功能（这里使用type='checkbox'的input来实现）
// 2. 点击中间button状态切换的时候，button两边的文字样式也要随之改变
// 3. 可以disable切换的功能，使之不可点击

app.run(function ($templateCache) {
  $templateCache.put('switcher.html',
    '<div class="switcher" ng-class="{active:switcherStatus, disabled: disableStatus}">' +
    ' <span class="switcher-label front" ng-click="switcherTurn(false)" ng-bind-html="trustAsHtml(switcherFrontSign)"></span>' +
    '   <label class="switcher-line">' +
    '     <input ' +
    '       class="inner-input" ' +
    '       type="checkbox" ' +
    '       ng-model="switcherStatus"' +
    '       ng-disabled="disableStatus"' +
    '       ng-change="changeFunc()">' +
    '     </input>' +
    '   </label>' +
    ' <span class="switcher-label back" ng-click="switcherTurn(true)" ng-bind-html="trustAsHtml(switcherBackSign)"></span>' +
    '</div>'
  );
});


app.directive('switcher', [ '$sce', function ($sce) {
  return {
    restrict: 'E',
    templateUrl: 'switcher.html',
    scope: {
      // turnOn: '&'
      switcherFrontSign: '@',
      switcherBackSign: '@'
    },
    link: function (scope, element, attr) {

      scope.switcherTurn = function (value) {
        if (!scope.disableStatus) {
          if (value != scope.switcherStatus) {
            scope.switcherStatus = value;
          }
        }
      }

      scope.trustAsHtml = function(value) {
        return $sce.trustAsHtml(value);
      }



    }
  }
}]);
