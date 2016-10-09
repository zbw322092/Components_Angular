// 功能梳理：
// 1. 点击password box之后输入值依次显示在几个密码框里面
// 2. 不点击password box按键盘不输入值
// 3. 输入的密码值是以黑色实心圆来显示的
// 4. 输入完六位之后自动把密码框里面的密码发往后台进行验证
// 5. 输入完密码之后密码输入框自动消失（可配置）

app.directive('passwordBox', ['$timeout', function($timeout) {
	return {
		restrict: 'AE',
		scope: {
			passwordRequest: '&',
			processing: '='
		},
		templateUrl: 'passwordBox.html',
		link: function(scope, element, attrs) {
			
			var inputDom = document.getElementsByClassName('password-input');
			scope.focusToInput = function() {
				inputDom[0].focus();
			}

			scope.passwordDot = new Array('','','','','','');

			scope.inputValueFunc = function() {
				if (scope.inputedValue.length < 6) {
					var passwordArray =  scope.inputedValue.split("");
					for (var i = 0; i < passwordArray.length; i++) {
						scope.passwordDot[i] = '*';
					}
					for (var n = passwordArray.length; n < 6; n++) {
						scope.passwordDot[n] = '';
					}

				} else if (scope.inputedValue.length = 6) {
					scope.passwordDot[5] = '*'
					$timeout(function() {
						scope.processing = true;
						scope.passwordRequest({data: scope.inputedValue});
					});
				}
			}
		}
	}
}]);

app.run(['$templateCache', function($templateCache) {
	$templateCache.put('passwordBox.html', 
	  '<ul class="password-list" ng-click="focusToInput()">' + 
	    '<li ng-repeat="passwordUnit in passwordDot track by $index" ng-bind="passwordUnit"></li>' +
	  '</ul>' +
	  '<input class="password-input" type="password" ng-disabled="processing" ng-keyup="inputValueFunc()" ng-model="inputedValue" maxlength="6">' +
	  '</input>'
	);
}]);