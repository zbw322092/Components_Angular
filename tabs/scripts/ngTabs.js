function tabController($scope) {
  this.i = 0;
  this.headerIndex = 0;
  this.p = 0,
    this.bodyIndex = 0;
  this.headerObject = {},
    this.bodyObject = {};

  // 这样写只是单纯的传入了值，并没有传入变量，所以并不会储存值。
  // this.tabIndex = function(indexType, index) {
  //   return indexType = ++index;
  // }

  this.tabHeaderIndex = function () {
    return this.headerIndex = ++this.i;
  }

  this.initTabHeader = function (element) {
    this.headerObject[this.headerIndex] = {
      headerIndex: this.headerIndex,
      headerElement: element
    }
  }

  this.tabBodyIndex = function () {
    return this.bodyIndex = ++this.p;
  }

  this.initTabBody = function (element) {
    this.bodyObject[this.bodyIndex] = {
      bodyIndex: this.bodyIndex,
      bodyElement: element
    }
  }

  this.showActiveFunc = function (object, indexName, ElementName, className, activeValue) {
    angular.forEach(object, function (value, key) {
      if (value[indexName] == activeValue) {
        angular.element(value[ElementName]).addClass(className);
      } else {
        angular.element(value[ElementName]).removeClass(className);
      }
    });
  }

}

app.directive('ngTabs', function () {
  return {
    scope: {
      defaultActivedTab: '@'
    },
    restrict: 'EAC',
    controller: ['$scope', tabController],
    link: function (scope, element, attrs, controller) {

      var defaultActivedTab = scope.defaultActivedTab ? scope.defaultActivedTab : "1";

      controller.showActiveFunc(
        controller.headerObject,
        'headerIndex',
        'headerElement',
        'active-line',
        defaultActivedTab
      );

      controller.showActiveFunc(
        controller.bodyObject,
        'bodyIndex',
        'bodyElement',
        'show-tab-body',
        defaultActivedTab
      );

    }
  }
});

app.directive('ngTabsHeader', function () {
  return {
    scope: false,
    restrict: 'EAC',
    require: '^ngTabs',
    link: function (scope, element, attrs, controller) {

      // console.log(controller);
      controller.tabHeaderIndex();
      // controller.tabIndex(controller.headerIndex, controller.i);

      controller.initTabHeader(element);
      console.log(controller.headerObject);

      attrs['index'] = controller.headerIndex;


      element.on('click', function () {

        controller.showActiveFunc(
          controller.headerObject,
          'headerIndex',
          'headerElement',
          'active-line',
          attrs.index
        );

        controller.showActiveFunc(
          controller.bodyObject,
          'bodyIndex',
          'bodyElement',
          'show-tab-body',
          attrs.index
        );

      });
    }
  }
});


app.directive('ngTabsBody', function () {
  return {
    scope: false,
    restrict: 'EAC',
    require: '^ngTabs',
    link: function (scope, element, attrs, controller) {

      controller.tabBodyIndex();
      controller.initTabBody(element);
      console.log(controller.bodyObject);

      angular.element(element).addClass('tab-body');
    }
  }
});
