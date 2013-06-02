angular.module('bookServices', ['ngResource']).
    factory('Book', function($resource) {
   return $resource('books/:bookId', {}, {
     get: {method: 'GET', isArray: true},
   });
});

angular.module('booktracker', ['bookServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'list.html', controller: ListCtrl}).
      when('/add', {templateUrl: 'add.html', controller: AddCtrl}).
      otherwise({redirectTo: '/'});
}]);

function ListCtrl($scope, Book) {
  $scope.books = Book.query();
}

function setIfDefined(src, key, dst) {
  if (key in src)
    dst[key] = src[key];
}

function AddCtrl($scope, Book) {
  this.scope_ = $scope;
  $scope.status = 'Wish';
  this.bookResource_ = Book;
  $scope.submit = this.submit.bind(this);
  console.log(this.routeParams_);
}

AddCtrl.prototype.createBook = function() {
  return new this.bookResource_();
}

AddCtrl.prototype.submit = function() {
  var book = this.createBook();
  setIfDefined(this.scope_, 'title', book);
  setIfDefined(this.scope_, 'url', book);
  if ('tag' in this.scope_)
    book['tag'] = this.scope_['tag'].split(',')
  setIfDefined(this.scope_, 'status', book);
  setIfDefined(this.scope_, 'imageurl', book);
  setIfDefined(this.scope_, 'comment', book);
  book.$save();
  window.location.href = '/';
}
