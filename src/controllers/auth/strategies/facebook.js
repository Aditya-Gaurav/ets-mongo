'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  to = require('await-to-js').default,
  config = require('../../../../src/config/config'),
  { createUserOfOauthProfile, getUserByProviderId } = require('../../../services/user.service'),
  logger = require('../../../config/logger');


const facebookStrategy = (app) => {
    
  const strategyOptions = {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'name', 'emails']

  }

  const verifyCallback = async(accessToken, refreshToken, profile, done) => {
    logger.info(profile);
    logger.info(email);
    logger.info(accessToken);
    logger.info(refreshToken);




    let [err, user] = await to(getUserByProviderId(profile.id));

    if(err || user) {
      logger.info(user);
      logger.info('err',err);
      return done(err, user)
    }
    
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;


    const [createdError, createdUser] = await to(
      createUserOfOauthProfile({
        name: profile.name.givenName + ' ' + profile.name.familyName,
        email: profile.emails ? profile.emails[0].value : undefined,
        username: profile.username,
        profileImageURL: (profile.id) ? '//graph.facebook.com/' + profile.id + '/picture?type=large' : undefined,
        provider: 'facebook',
        providerData: providerData,
        providerId: profile.id

      })

    ) 
    

    return done(createdError, createdUser)
  
  }
  
  passport.use(new FacebookStrategy(strategyOptions, verifyCallback));
  return app;

}   

module.exports = facebookStrategy;
