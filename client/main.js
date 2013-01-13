$(function(){

  window.Book = Backbone.Model.extend({
    clear: function() {
      this.destroy();
      this.view.remove();
    }
  });

  window.BookList = Backbone.Collection.extend({
    model: Book,

    url: '/books',

    parse: function(response) {
      var books = response;
      for (var i = 0; i < books.length; ++i) {
        this.add(new Book(books[i]));
      }
    },
  });

  window.BookView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#book-template').html()),

    initialize: function() {
      _.bindAll('render');
      this.model.view = this;
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  window.booklist = new BookList;

  // The Application
  // ---------------

  window.AppView = Backbone.View.extend({

    el: $("#booktracker-app"),

    events: {
      'click #delete': 'deleteBooks',
      'click #edit': 'editBooks',
      'click #update': 'updateBooklist',
    },

    initialize: function() {
      _.bindAll(this, 'addBook', 'deleteBooks', 'editBooks', 'removeBookDOM',
                'updateBooklist');
      booklist.bind('add', this.addBook)
      booklist.fetch();
    },

    addBook: function(book) {
      var view = new BookView({model: book});
      this.$('#booklist-table-body').append(view.render().el);
    },

    deleteBooks: function() {
      var self = this;
      $.get('/delete', function() {
        self.removeBookDOM();
      });
    },

    editBooks: function() {
      location.href = '/edit';
    },

    removeBookDOM: function () {
      this.$('#booklist tr td').parent().remove();
    },

    updateBooklist: function() {
      var self = this;
      $.get('/update', function() {
        self.removeBookDOM();
        booklist.fetch();
      });
    }
  });

  window.App = new AppView;
});
