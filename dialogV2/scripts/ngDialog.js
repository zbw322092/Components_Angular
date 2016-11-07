// dialogV2重新开始
// 从主干的需求开始做，然后再在主干的需求上面开发进一步的需求。
// 主要需求：
// 1. 点击按钮打开dialog
// 2. 用户可以选择是否显示close按钮，点击这个按钮之后close掉这个dialog
// 3. 用户可以选择是否显示overlay。
// 4. 用户可以选择是否点击overlay执行关闭dialog的功能
// 5. 用户在关闭dialog之后有个回调，执行回调函数。

app.provider('ngDialog', function() {
	var defaultConfig = {
		showClose: false,
		showOverlay: true,
		closeByOverlay: true
	}
	this.$get = ['$window', function($window) {

		var publicMethods = {
			open: function(options) {

				angular.extend(defaultConfig, options);


			}
		}

		return publicMethods;

	}];
	
});
