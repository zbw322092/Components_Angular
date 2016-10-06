var i = 0, headerIndex = 0;
var p = 0, bodyIndex = 0;

app.directive('ngTabs', function() {
  return {
    scope: false,
    restrict: 'EAC',
    link: function(scope, element, attrs) {
      console.log(scope);
      console.log(element);
      console.log(attrs);
    }
  }
});

app.directive('ngTabsHeader', function() {
  return {
    scope: false,
    restrict: 'EAC',
    link: function(scope, element, attrs) {
      console.log(scope);
      console.log(element);
      console.log(attrs);

      function tabHeaderIndex() {
        return headerIndex = ++i;
      }
      tabHeaderIndex();
      console.log('header index: ' + headerIndex);

      var headerObject = {};

      element.on('click', function(headerIndex) {
        if (bodyIndex === headerIndex) {

        }
      });

    }
  }
});


app.directive('ngTabsBody', function() {
  return {
    scope: false,
    restrict: 'EAC',
    link: function(scope, element, attrs) {
      console.log(scope);
      console.log(element);
      console.log(attrs);

      function tabBodyIndex() {
        return bodyIndex = ++p;
      }
      tabBodyIndex();
      console.log('body index: ' + bodyIndex);

      var bodyObject = {};

    }
  }
});



















