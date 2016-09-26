// 需求分析：
// 1. 点击删除按钮，可以将input中的内容一次性删除掉
// 2. input框中没有内容的时候，删除按钮不显示
// 3. 当输入框里面有内容显示出close按钮的时候，点击输入框以外的地方，close按钮消失

// 基础知识：
// Javascript事件参考：
// 当输入框开始有输入的时候，可以看成有onkeyup事件的时候
// 当点击输入框以外的地方的时候，可以看成是onblur事件的时候

// app.directive('deleteInput', function() {
// 	return {
// 		restrict: 'A',
// 		template: ''
// 	}
// });