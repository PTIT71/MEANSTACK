var FacebookStrategy = require('passport-facebook').Strategy;
var User = require("../models/user");
var session= require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var jwt = require('jsonwebtoken');
var secret = 'harrypotter';


module.exports = function(app, passport){
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true,cookie: { secure: false }}));

  passport.serializeUser(function(user, done) {    
    console.log('----------serializeUser---------');
    token = jwt.sign({username: user.username, email: user.email, userid: user._id}, secret, {expiresIn: 300});
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
    passport.use(new FacebookStrategy({
        clientID: '279124969633978',
        clientSecret: '7a0190c1617c8c8567f23e4bf785ec4e',
        callbackURL: "http://localhost:3100/auth/facebook/callback",
        profileFields:['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, done) {
        console.log('----------------'+ profile._json.email);
        User.findOne({email: profile._json.email}).select('_id username password email')
        .exec(function(err,user){
         
            if(err) {
              console.log('-------err 1------------');
              done(err);
            } 
            if(user && user != null)
            {
              console.log('----------Have user---------');
              done(null,user);
              
              console.log(user);
            }else{
              console.log('-------err 2------------');
              console.log(user);
              done(err);
            }
        });
        console.log(profile);
       // done(null, profile);
      }
    ));


  
  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(new GoogleStrategy({
      clientID: '326398077933-ihiem6moc5enna1j2kdpecaqum4r49k4.apps.googleusercontent.com',
      clientSecret: 'i9mct1SsucTfzajbbS-IZVcP',
      callbackURL: "http://localhost:3100/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
        User.findOne({email: profile._json.email}).select('_id username password email')
        .exec(function(err,user){
         
            if(err) {
              console.log('-------err 1------------');
              done(err);
            } 
            if(user && user != null)
            {
              console.log('----------Have user ssssssss---------');
              done(null,user);
              
              console.log(user);
            }else{
              console.log('-------err 2------------');
              console.log(user);
              done(err);
            }
        });
    }
  ));

  app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/googleerror' }),
    function(req, res) {
      res.redirect('/google/'+ token);
    });


    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/facebookerror' }), function(req,res){
      res.redirect('/facebook/' + token);
    });
    app.get('/auth/facebook',passport.authenticate('facebook', { scope: 'email' }));

    return passport;
};