import json
import model
import webapp2


class BookHandler(webapp2.RequestHandler):
  def get(self):
    books = [book.ToDict() for book in model.Book.query()]
    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(books))


app = webapp2.WSGIApplication([('/books', BookHandler)],
                               debug=True)
