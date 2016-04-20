'use strict';

const authentication = require('feathers-authentication');

const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GithubStrategy = require('passport-github').Strategy;
const GithubTokenStrategy = require('passport-github-token');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;

module.exports = function() {
  const app = this;

  let config = app.get('auth');
  config.cookie = {
    name: 'feathers-jwt',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 1209600000 //14 days
  };
  config.token.expiresIn = "14d";
  config.facebook.strategy = FacebookStrategy;
  config.facebook.tokenStrategy = FacebookTokenStrategy;
  config.github.strategy = GithubStrategy;
  config.github.tokenStrategy = GithubTokenStrategy;
  config.google.strategy = GoogleStrategy;
  config.google.tokenStrategy = GoogleTokenStrategy;

  app.set('auth', config);
  app.configure(authentication(config));
};
