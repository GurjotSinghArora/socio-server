const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  username: String,
  body: String,
  createdAt: String,
  likes: [
    {
      username: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Post', postSchema);