import json
import logging
import model
import os
import webapp2
from google.appengine.api import users
from google.appengine.ext import ndb
from webapp2_extras.appengine.users import login_required


class BooklistView(webapp2.RequestHandler):
  @login_required
  def get(self):
    content = file(os.path.join(os.path.dirname(__file__), '..', 'client',
                                'main.html')).read()
    self.response.headers['Content-Type'] = 'text/html'
    self.response.out.write(content)


class BookHandler(webapp2.RequestHandler):
  def get(self):
    books = [book.ToDict() for book in model.Book.query()]
    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(books))


app = webapp2.WSGIApplication([('/*', BooklistView),
                               ('/books', BookHandler)],
                               debug=True)
