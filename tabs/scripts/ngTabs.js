var i = 0,
  headerIndex = 0;
var p = 0,
  bodyIndex = 0;
var headerObject = {};
var bodyObject = {};


app.directive('ngTabs', function () {
  return {
    scope: {
      defaultActivedTab: '@'
    },
    restrict: 'EAC',
    link: function (scope, element, attrs) {
      console.log(scope);
      console.log(element);
      console.log(attrs);

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
    link: function (scope, element, attrs) {
      console.log(scope);
      console.log(element);
      console.log(attrs);

      function tabHeaderIndex() {
        return headerIndex = ++i;
      }
      tabHeaderIndex();
      console.log('header index: ' + headerIndex);

      function initTabHeader() {
        headerObject[headerIndex] = {
          headerIndex: headerIndex,
          headerElement: element
        };
      }
      initTabHeader();
      console.log(headerObject);

      attrs['index'] = headerIndex;

      element.on('click', function () {
        console.log(attrs);
        console.log(attrs.index);

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

      console.log(element);

    }
  }
});


app.directive('ngTabsBody', function () {
  return {
    scope: false,
    restrict: 'EAC',
    link: function (scope, element, attrs) {
      console.log(scope);
      console.log(element);
      console.log(attrs);

      function tabBodyIndex() {
        return bodyIndex = ++p;
      }
      tabBodyIndex();
      console.log('body index: ' + bodyIndex);

      angular.element(element).addClass('tab-body')

      function initTabBody() {
        bodyObject[bodyIndex] = {
          bodyIndex: bodyIndex,
          bodyElement: element
        };
      }

      initTabBody();
      console.log(bodyObject);

    }
  }
});



















