const { Sequelize } = require('sequelize');

const sequelize  = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect:'postgres'
  });
module.exports = sequelize;

const tweets = require('../models/tweets');
const users = require('../models/users');
const tweet_medias = require('../models/tweet_medias');
const tweet_comments = require('../models/tweet_comments');
const tweet_likes = require('../models/tweet_likes');

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

