// dialogV2重新开始
// 从主干的需求开始做，然后再在主干的需求上面开发进一步的需求。
// 主要需求：
// 1. 点击按钮打开dialog
// 2. 用户可以选择是否显示close按钮，点击这个按钮之后close掉这个dialog
// 3. 用户可以选择是否显示overlay。
// 4. 用户可以选择是否点击overlay执行关闭dialog的功能
// 5. 用户在关闭dialog之后有个回调，执行回调函数。

app.provider('ngDialog', function() {
	var $el = angular.element;
	var $body = $el(document.querySelector('body'));
	var defaultConfig = {
		showClose: false,
		showOverlay: true,
		closeByOverlay: true,
		closeByESC: true
	}
	this.$get = ['$window', '$q', '$http', '$templateCache', function($window, $q, $http, $templateCache) {

		var publicMethods = {

			closeDialog: function($dialog) {
				var closeCallback = $dialog.data('dialogCallbackFunc');
				$dialog.unbind('click');
				$el($window).unbind('keydown');
				

				if (angular.isFunction(closeCallback)) {
					var callbackResult = closeCallback();
					if (angular.isObject(callbackResult)) {
						callbackResult.then(function() {
							console.log('object here');
							$dialog.remove();
						})
						.catch(function() {
							console.log('return here');
							return;
						});
					} else if (callbackResult !== false) {
						console.log('not false here');
						$dialog.remove();
					}					
				} else {
					console.log('not function here');
					$dialog.remove();
				}

			},


			open: function(options) {
				optionsConfig = angular.isObject(options) ? angular.extend(defaultConfig, options) : defaultConfig;
				$q.when(loadCustomizedTemplate(optionsConfig.template || optionsConfig.templateUrl))
					.then(function(template) {
						console.log(template);

						if(optionsConfig.showClose) {
							template += '<div class="dialog-close"></div>';
						}

						var $dialog = $el('<div class="ngdialog"></div>');
						$dialog = optionsConfig.showOverlay ?
							$dialog.html('<div class="dialog-overlay"></div><div class="dialog-content">' + template + '</div>') :
							$dialog.html('<div class="dialog-content">' + template + '</div>');

						console.log($dialog[0]);

						$body.append($dialog[0]);

						// 这里根据设置来决定点击overlay是否会关闭dialog。
						// 一个比较容易想到的方法是在上面的DOM结构上面加上ng-click，然后在函数中判断设置是否为true来执行操作
						// 上面的方法容易想到符合直觉，但是会使得DOM结构上面的东西变多，现在下面使用另外一种方法来实现一次。
						if (optionsConfig.closeByOverlay) {
							$dialog.bind('click', function(event) {
								if ($el(event.target).hasClass('dialog-overlay')) {
									console.log(optionsConfig.preCloseCallback);
									publicMethods.closeDialog($dialog);
								}
							});
						}

						$dialog.bind('click', function(event) {
							if ($el(event.target).hasClass('dialog-close')) {
								console.log(optionsConfig.preCloseCallback);
								publicMethods.closeDialog($dialog);
							}
						});


						// close by ESC
						if (optionsConfig.closeByESC) {
							$el($window).bind('keydown', function(event) {
								if (event.which === 27) {
									console.log(optionsConfig.preCloseCallback);
									publicMethods.closeDialog($dialog);
								}
							});							
						}

						if (angular.isFunction(optionsConfig.preCloseCallback)) {
							$dialog.data('dialogCallbackFunc', optionsConfig.preCloseCallback);
							console.log($dialog.data('dialogCallbackFunc'));
						}










					})
					.catch();

				function loadCustomizedTemplate(template) {
					// load template有几种情况
					// 1. 用户填写的是plain，然后template属性是个string
					// 2. 用户填写的是url，然后templateUrl属性是个string，指向一个template
					// 		2.1 这个template加载不使用cache
					// 		2.2 这个template加载使用cache，优先从$templateCache里面取
					if (optionsConfig.plain == true && angular.isString(template)) {
						return template;
					} else if (optionsConfig.plain == false && angular.isString(template) && optionsConfig.cache == false) {
						loadCustomizedTemplateUrl(template, {cache: false});
					} else if (optionsConfig.plain == false && angular.isString(template) && optionsConfig.cache != false) {
						return $templateCache.get(template) || loadCustomizedTemplateUrl(template, {cache: true});
					}
				}

				function loadCustomizedTemplateUrl(url, config) {
					$http.get(url, config || {})
						.then(function(res) {
							return res.data || '';
						})
						.catch(function(err) {
							return new Error('template error: ' + err);
						});
				}



			}
		}

		return publicMethods;

	}];
	
});
