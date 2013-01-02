import datetime
import logging
from google.appengine.ext import ndb
from google.appengine.api import users

class Book(ndb.Model):
  owner = ndb.UserProperty()
  timestamp = ndb.DateTimeProperty(required=True)
  title = ndb.StringProperty(required=True)
  url = ndb.TextProperty(required=True)
  tag = ndb.StringProperty(repeated=True)
  status = ndb.StringProperty()
  comment = ndb.TextProperty()
  imageurl = ndb.TextProperty()

  def ToDict(self):
    return {'title': self.title,
            'url': self.url,
            'tag': ' '.join(self.tag),
            'status': self.status,
            'imageurl': self.imageurl}
