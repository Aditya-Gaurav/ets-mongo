 'use strict';

const logger = require('../../../config/logger');

// const { config } = require('dotenv/types');

// /**
//  * Module dependencies.
//  */
// var passport = require('passport'),
//   GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
//   users = require('../../controllers/users.server.controller');

// module.exports = function (config) {
//   // Use google strategy
//   passport.use(new GoogleStrategy({
//     clientID: config.google.clientID,
//     clientSecret: config.google.clientSecret,
//     callbackURL: config.google.callbackURL,
//     passReqToCallback: true
//   },
//   function (req, accessToken, refreshToken, profile, done) {
//     // Set the provider data and include tokens
//     var providerData = profile._json;
//     providerData.accessToken = accessToken;
//     providerData.refreshToken = refreshToken;

//     // Create the user OAuth profile
//     var providerUserProfile = {
//       firstName: profile.name.givenName,
//       lastName: profile.name.familyName,
//       displayName: profile.displayName,
//       email: profile.emails[0].value,
//       username: profile.username,
//       profileImageURL: (providerData.picture) ? providerData.picture : undefined,
//       provider: 'google',
//       providerIdentifierField: 'id',
//       providerData: providerData
//     };

//     // Save the user OAuth profile
//     users.saveOAuthUserProfile(req, providerUserProfile, done);
//   }));
 
 
//   const strategy = {
//     clientID: config.google.clientID,
//     clientSecret: config.google.clientSecret,
//     callbackURL: config.google.callbackURL,
//     passReqToCallback: true
//   }

//   const verifyCallback = async (accessToken, refreshToken, profile, done) {

//   }

//   passport.use(new GoogleStrategy(strategy, verifyCallback))
// };


const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  to = require('await-to-js').default,
  config = require('../../../../src/config/config'),
  { createUserOfOauthProfile, getUserByProviderId } = require('../../../services/user.service')


 

const googleStrategy = (app) => {
    
  const strategyOptions = {
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  }

  const verifyCallback = async(accessToken, refreshToken, profile, done) => {
    console.log(profile.id);
    let [err, user] = await to(getUserByProviderId(profile.id));

    if(err || user) {
      logger.info(user);
      logger.info('err',err);
      return done(err, user)
    }

    const verifiedEmail = profile.emails.find(email => email.verified) || profile.emails[0];

    console.log('verifiedEmail', verifiedEmail);
      
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    console.log(profile);

    const [createdError, createdUser] = await to(
      createUserOfOauthProfile({
        name: profile.name.givenName + ' ' + profile.name.familyName,
        email: profile.emails[0].value,
        username: profile.username,
        profileImageURL: (providerData.picture) ? providerData.picture : undefined,
        provider: 'google',
        providerData: providerData,
        providerId: profile.id
      })

    ) 

    return done(createdError, createdUser)
  
  }
  
  passport.use(new GoogleStrategy(strategyOptions, verifyCallback));
  return app;

}      

module.exports = googleStrategy;
