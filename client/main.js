angular.module('bookServices', ['ngResource']).
    factory('Book', function($resource){
  return $resource('books/:bookId', {}, {
    query: {method:'GET', params:{bookId: ''}, isArray:true}
  });
});

angular.module('booktracker', ['bookServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'list.html', controller: BooktrackerCtrl}).
      otherwise({redirectTo: '/'});
}]);

function BooktrackerCtrl($scope, Book) {
  $scope.books = Book.query();
}
