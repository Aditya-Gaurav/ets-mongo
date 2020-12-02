const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth/auth.controller');
const passport = require('passport');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/sendemail-verification', validate(authValidation.mailVerification), authController.emailVerification);
router.post('/logout', validate(authValidation.logout), authController.logout);

// router.post('/confirmemail-verification', validate(authValidation.resendmailVerification), authController.confirmemailVerification);


// Setting the google oauth routes
router.get('/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    })
)
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' } ), (req, res) => {
         var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            user: req.user
        }));
       return res.status(200).send(responseHTML);
    // return res.status(200) 


})


// router.get('/google/callback',
//     passport.authenticate('google', { failureRedirect: '/fail' }),
//     function(req, res) {
//         console.log('%value%');
//         var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
//         responseHTML = responseHTML.replace('%value%', JSON.stringify({
//             user: req.user
//         }));
//         res.status(200).send(responseHTML);
//     });


// Setting the facebook oauth routes
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }) );


// // Setting up the authController authentication api
// router.post('/api/auth/signin', authController.signin);
// router.get('/api/auth/signout', authController.signout);

// //setting ldap AD auth routes
// router.post('/api/auth/ldap', authController.ldap_signin);

// // Setting the facebook oauth routes
// router.get('/api/auth/facebook', authController.oauthCall('facebook', {
//   scope: ['email']
// }));
// router.get('/api/auth/facebook/callback', authController.oauthCallback('facebook'));

// // Setting the twitter oauth routes
// router.get('/api/auth/twitter').get(authController.oauthCall('twitter'));
// router.get('/api/auth/twitter/callback', authController.oauthCallback('twitter'));

// // Setting the google oauth routes
// router.get('/api/auth/google', authController.oauthCall('google', {
//   scope: [
//     'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/userinfo.email'
//   ]
// }));
// router.get('/api/auth/google/callback', authController.oauthCallback('google'));

// // Setting the linkedin oauth routes
// router.get('/api/auth/linkedin', authController.oauthCall('linkedin', {
//   scope: [
//     'r_basicprofile',
//     'r_emailaddress'
//   ]
// }));
// router.get('/api/auth/linkedin/callback', authController.oauthCallback('linkedin'));

// // Setting the github oauth routes
// router.get('/api/auth/github', authController.oauthCall('github'));
// router.get('/api/auth/github/callback', authController.oauthCallback('github'));

// // Setting the paypal oauth routes
// router.get('/api/auth/paypal', authController.oauthCall('paypal'));
// router.get('/api/auth/paypal/callback', authController.oauthCallback('paypal'));

// // Setting the saml2 routes
// router.get('/login',
//   passport.authenticate('saml',
//     {
//       successRedirect: '/dashboards',
//       failureRedirect: '/login'
//     })
// );
// router.post('/login/callback',
//   passport.authenticate('saml',
//     {
//       failureRedirect: '/unknown-user',
//       failureFlash: true
//     }),
//   function (req, res) {
//     if(req.user.roles.indexOf('root') > -1 || req.user.roles.indexOf('partner') > -1) {
//       res.redirect('/');
//     } else {
//       res.redirect('/dashboards');
//     }
//   }
// );

// router.get('/logout/callback', function(req, res){
//   console.log("logout called");
//   req.logout(); 
//   res.redirect('/login'); 
// });


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * path:
 *  /auth/register:
 *    post:
 *      summary: Register as user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - password
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *              example:
 *                name: fake name
 *                email: fake@example.com
 *                password: password1
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: Login
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *              example:
 *                email: fake@example.com
 *                password: password1
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */

/**
 * @swagger
 * path:
 *  /auth/refresh-tokens:
 *    post:
 *      summary: Refresh auth tokens
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *              example:
 *                refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * path:
 *  /auth/forgot-password:
 *    post:
 *      summary: Forgot password
 *      description: An email will be sent to reset password.
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *              example:
 *                email: fake@example.com
 *      responses:
 *        "204":
 *          description: No content
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * path:
 *  /auth/reset-password:
 *    post:
 *      summary: Reset password
 *      tags: [Auth]
 *      parameters:
 *        - in: query
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *          description: The reset password token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - password
 *              properties:
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *              example:
 *                password: password1
 *      responses:
 *        "204":
 *          description: No content
 *        "401":
 *          description: Password reset failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Password reset failed
 */
