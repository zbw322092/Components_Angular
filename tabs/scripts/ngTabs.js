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
  
  this.tabHeaderIndex = function() {
    return this.headerIndex = ++this.i;
  }

}

app.directive('ngTabs', function () {
  return {
    scope: {
      defaultActivedTab: '@'
    },
    restrict: 'EAC',
    controller: ['$scope', tabController],
    link: function (scope, element, attrs) {

      var defaultActivedTab = scope.defaultActivedTab ? scope.defaultActivedTab : "1";

      angular.forEach(headerObject, function (value, key) {
        if (value.headerIndex == defaultActivedTab) {
          angular.element(value.headerElement).addClass('active-line');
        } else {
          angular.element(value.headerElement).removeClass('active-line');
        }
      });

      angular.forEach(bodyObject, function (value, key) {
        if (value.bodyIndex == defaultActivedTab) {
          angular.element(value.bodyElement).addClass('show-tab-body');
        } else {
          angular.element(value.bodyElement).removeClass('show-tab-body');
        }
      });

    }
  }
});

app.directive('ngTabsHeader', function () {
  return {
    scope: false,
    restrict: 'EAC',
    require: '^ngTabs',
    link: function (scope, element, attrs, controller) {
      
      console.log(controller);
      controller.tabHeaderIndex();
      // controller.tabIndex(controller.headerIndex, controller.i);
      

      function initTabHeader() {
        headerObject[headerIndex] = {
          headerIndex: headerIndex,
          headerElement: element
        };
      }
      initTabHeader();

      attrs['index'] = headerIndex;

      element.on('click', function () {

        angular.forEach(headerObject, function (value, key) {
          if (value.headerIndex === attrs.index) {
            angular.element(value.headerElement).addClass('active-line');
          } else {
            angular.element(value.headerElement).removeClass('active-line');
          }
        });

        angular.forEach(bodyObject, function (value, key) {
          if (value.bodyIndex === attrs.index) {
            angular.element(value.bodyElement).addClass('show-tab-body');
          } else {
            angular.element(value.bodyElement).removeClass('show-tab-body');
          }
        });

      })
    }
  }
});


app.directive('ngTabsBody', function () {
  return {
    scope: false,
    restrict: 'EAC',
    require: '^ngTabs',
    link: function (scope, element, attrs) {

      function tabBodyIndex() {
        return bodyIndex = ++p;
      }
      tabBodyIndex();
      angular.element(element).addClass('tab-body')

      function initTabBody() {
        bodyObject[bodyIndex] = {
          bodyIndex: bodyIndex,
          bodyElement: element
        };
      }

      initTabBody();
    }
  }
});



















