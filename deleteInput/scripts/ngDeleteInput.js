// 需求分析：
// 1. 点击删除按钮，可以将input中的内容一次性删除掉
// 2. input框中没有内容的时候，删除按钮不显示
// 3. 当输入框里面有内容显示出close按钮的时候，点击输入框以外的地方，close按钮消失

// 基础知识：
// Javascript事件参考：
// 当输入框开始有输入的时候，可以看成有onkeyup事件的时候
// 当点击输入框以外的地方的时候，可以看成是onblur事件的时候

app.directive('deleteInput', ['$compile', function($compile) {
	return {
		restrict: 'A',
		// 这里不能用template的方式，因为这个组件想把close按钮方案input tag的后面，这里就需要用到了jQuery里面的
		// after()方法
		template: '',
		link: function(scope, element, attr){
			// 因为要定义clearInput，但是通过angular.element定义的dom上面的属性没有办法通过directive link中的scope
			// element或者attr来取到，所以就要用到下面的$compile
			// offical docs对$compile的描述是Compiles an HTML string or DOM into a template and produces a 
			// template function, which can then be used to link scope and the template together.
			// 
			// 直接angular.element的写法没法通过scope来定义ng-click，但是可以通过.on('click')的方式来定义其行为，那么
			// 这个时候ng-click就是不必要的了。
			// var closeIconElement = 
			// 	angular.element('<span class="close-icon" clickable ng-show="showClose"></span>');
			
			var closeIconElement2 = $compile('<span class="close-icon" clickable ng-click="clearInput()"></span>')(scope);

			element.after(closeIconElement2);
			
			// console.log(closeIconElement);
			console.log(closeIconElement2);
			// console.log(element);

			scope.clearInput = function() {
				element.val("");
			}

			// closeIconElement.on('click', function() {
			// 	// window.alert('ok');
			// 	element.val("");
			// 	console.log(document.getElementsByClassName('input-field'));
			// 	console.log(typeof document.getElementsByClassName('input-field')); // object
			// 	console.log(document.getElementsByClassName('input-field')[0]);
			// 	console.log(typeof document.getElementsByClassName('input-field')[0]); // object
			// 	console.log(document.getElementsByClassName('input-field')[0].value); // 222

			// 	console.log(element);
			// 	console.log(typeof element); // object
			// 	console.log(element.innerHTML);
			// 	console.log(element[0]);
			// 	console.log(element[0].value);

			// 	console.log(document.getElementsByClassName('input-field') == element); // false


			// 	console.log(element.value);
			// 	console.log(attr);
			// 	// 这里不可以使用innerHTML属性来定义，因为input里面的值不是赋给innerHTML属性的，而是赋给value属性的。
			// 	// element.innerHTML='';
			// 	// 
			// 	// 通过上面的log结果来看，下面的语句也是可以达到清空input内容的结果，但是这样写起来比较难懂，还是直接使用
			// 	// val()方法比较方便。
			// 	// element[0].value = '';
			// });

		}
	}
}]);