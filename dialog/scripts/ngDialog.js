(function(m) {




	m.provider('ngdialog', function() {
		// 因为我们想这套provider被用于构建各种样式的dialog，那么这意味着我们需要各种样式的template，
		// 那么这就涉及到我们要去取template这个步骤，而这个步骤是异步的。

		var defaults = this.defaults = {
			plain: false,
			cache: true
		}

		this.$get = ['$q', '$http', '$templateCache', function($q, $http, $templateCache) {


			var privateMethods = {

			};

			var publicMethods = {
				open: {

					var options = angular.copy(defaults);


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




})(app);