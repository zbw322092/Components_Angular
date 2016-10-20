var app = angular.module('dialog_app', []);

app.factory('extend', ['$log', function($log) {
	var ObjProto = Object.prototype;
	var hasOwnPrototype = Object.hasOwnPrototype;
	var nativeCreate = Object.create;
	var Ctor = function() {};

	var has = function(obj, key) {
		return obj != null && hasOwnPrototype(obj, key);
	};

	var isObject = function(obj) {
		var type = typeof obj;
		return type === 'function' || type === 'object' && !!obj;
	}

	// 这个函数的作用是提供一个prototype，然后继承prototype创建出一个object
	var baseCreate = function(prototype) {
		if (!isObject(prototype)) return {};
		if (nativeCreate) return nativeCreate(prototype);
		Ctor.prototype = prototype;
		var result = new Ctor();
		Ctor.prototype = null;
		return result;
	};

	// 下面这个函数的作用是在继承一个prototype之后我们再给新创建的这个object添加新的属性
	var create = function(prototype, props) {
		var result = baseCreate(prototype);
		result = angular.extend(result, props);
		return result;
	};


	var extend = function(protoProps, staticProps) {
		var parent = this;
		var child;

		if (protoProps && has(protoProps, 'constructor')) {
			child = protoProps.constructor;
		} else {
			child = function() {
				return parent.apply(this, arguments);
			};
		}

		angular.extend(child, parent, staticProps);

		child.prototype = create(parent.prototype, protoProps);
		child.prototype.constructor = child;

		child.__super__ = parent.prototype;

		return child;
	}

	return extend;

}]);