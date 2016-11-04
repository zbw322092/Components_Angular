	app.provider('ngdialog', function() {
		// 因为我们想这套provider被用于构建各种样式的dialog，那么这意味着我们需要各种样式的template，
		// 那么这就涉及到我们要去取template这个步骤，而这个步骤是异步的。

		var defaults = this.defaults = {
			plain: false,
			cache: true
		}

		var $el = angular.element;

		this.$get = ['$document', '$q', '$http', '$templateCache','$rootScope', function($document, $q, $http, $templateCache, $rootScope) {
			var $body = $document.find('body');

			var privateMethods = {
				// 当我们按下一个按键的时候，会触发一个事件，这个event对象会有一个keyCode属性
				onKeyDown: function(event) {
					if (event.keyCode === 27) {
						// some code here -- close dialog
						window.alert('close the dialog');
					}
				}
			};

			var publicMethods = {
				open: function(opts) {
					// 这样做的目的是在闭包中，this不在指向调用外层函数的object，为了解决这个问题，将外层函数的this赋值给一个变量。
					var self = this;
					var $dialog, $dialogParent;

					var options = angular.copy(defaults);
					opts = opts || {};
					angular.extend(options, opts);

					var scope = angular.isObject(options.scope) ? options.scope.$new() : $rootScope.$new();

					$q.when(loadTemplate(options.template || options.templateUrl))
						.then(function(template) {
							$templateCache.put(options.template || options.templateUrl, template);

							// 是否需要显示close按钮
							if (options.showClose) {
								template += '<div class="ngdialog-close"></div>';
							}

							self.$result = $dialog = $el('<div id="ngdialog" class="ngdialog"></div>');
							// 是否需要显示overlay
							$dialog.html((options.overlay ? 
								'<div class="ngdialog-overlay"></div><div class="ngdialog-content">' + template + '</div>':
								'<div class="ngdialog-content">' + template + '</div>'
							));

							console.log($dialog[0]);

							if (options.className) {
								$dialog.addClass(options.className);
							}

							// 这个规定这个弹框的父级是谁
							if (options.appendTo && angular.isString(options.appendTo)) {
								$dialogParent = $el(document.querySelector(options.appendTo));
							} else {
								$dialogParent = $body;
							}

							$dialogParent.append($dialog);
							// 规定是否为弹框按钮关闭的时候设置callback。主要是一些类型判断。
							if (options.preCloseCallback) {
								var preCloseCallback;

								if (angular.isFunction(options.preCloseCallback)) {
									preCloseCallback = options.preCloseCallback;
								} else if (angular.isString(options.preCloseCallback)) {
									if (scope) {
										if (angular.isFunction(scope[options.preCloseCallback])) {
											preCloseCallback = scope[options.preCloseCallback];
										} else if (scope.$parent && angular.isFunction(scope.$parent[options.preCloseCallback])) {
											preCloseCallback = scope.$parent[options.preCloseCallback];
										} else if ($rootScope && angular.isFunction($rootScope[options.preCloseCallback])) {
											preCloseCallback = $rootScope[options.preCloseCallback];
										}
									}
								}

								if (preCloseCallback) {
									$dialog.data('$ngDialogPreCloseCallBack', preCloseCallback);
								}
							}

							// 是否通过ESC键来关闭窗口
							if (options.closeByEscape) {
								$body.bind('keydown', privateMethods.onKeyDown);
							}

							// 是否在url发生变化的时候关闭窗口
							// 这个时候用到一个$rootScope的一个事件，$stateChangeStart
							if (options.closeByNavigation) {
								$rootScope.$on('$stateChangeStart', function() {
									// some code here
								});
							}

							closeByDocumentHandler = function(event) {
								var isOverlay = options.closeByDocument ? $el(event.target).hasClass('ngdialog-overlay') : false;
								var isCloseBtn = $el(event.target).hasClass('ngdialog-close');

								if (isOverlay || isCloseBtn) {
									// some code here
								}
							};

							$dialog.bind('click', closeByDocumentHandler);



						});


					function loadTemplateUrl(template, config) {
						$http.get(template, (config || {})).then(function(res) {
							return res.data || '';
						});
					}


					function loadTemplate(template) {
						if (!template) {
							return 'No Template';
						}

						if (angular.isString(template) && options.plain) {
							return template;
						}

						if (typeof options.cache === 'boolean' && !options.cache) {
							return loadTemplateUrl(template, {
								cache: false
							});
						}

						return $templateCache.get(template) || loadTemplateUrl(template, {
							cache: true
						});
					}

				}

			};

			return publicMethods;

		}];
	});	
