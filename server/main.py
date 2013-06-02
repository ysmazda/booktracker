import json
import model
import webapp2


class BookHandler(webapp2.RequestHandler):
  def get(self):
    books = [book.ToDict() for book in model.Book.query()]
    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(books))

  def post(self):
    data = json.loads(self.request.body)
    book = model.Book(title = data.get('title'),
                      url = data.get('url'),
                      tag = data.get('tag'),
                      status = data.get('status'),
                      imageurl = data.get('imageurl'))
    comment = data.get('comment')
    if comment:
      book.comment = comment
    book.put()


app = webapp2.WSGIApplication([('/books', BookHandler)],
                               debug=True)
