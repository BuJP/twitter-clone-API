
const tweets = require('./tweets');
const users = require('./users');

const tweet_medias = require('./tweet_medias');
const tweet_comments = require('./tweet_comments');
const tweet_likes = require('./tweet_likes');
users.hasMany(tweets, {
  foreignKey: 'author'
})
users.hasMany(tweet_comments, {
  foreignKey: 'user'
})
users.hasMany(tweet_likes, {
  foreignKey:"user"
})
tweets.hasMany(tweet_medias, {
  foreignKey: 'tweet'
})
tweets.hasMany(tweet_comments,{
  foreignKey: 'tweet'
})
tweets.hasMany(tweet_likes,{
  foreignKey: 'tweet'
})