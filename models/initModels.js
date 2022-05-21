const { Post } = require('./post.model');
const { User } = require('./user.model');
const { Comment } = require('./comment.model');
const { Image } = require('./postImg.model');

const initModels = () => {
  // 1 User <----> M Post
  // User.hasMany(Post, { foreignKey: 'userId' });
  User.hasMany(Post);
  Post.belongsTo(User);

  // 1 User <----> M Comment
  User.hasMany(Comment);
  Comment.belongsTo(User);

  // 1 Post <----> M Comment
  Post.hasMany(Comment);
  Comment.belongsTo(Post);

Post.hasMany(Image);
Image.belongsTo(Post);
};


module.exports = { initModels };
