var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    easyPbkdf2 = require("easy-pbkdf2")(),
    userMgr = require('../app/users').userMgr;


//read the passport api docs if you wanna know what this does
passport.use(new LocalStrategy(
  function(username, password, done) {
    findByEmail(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      authenticate(user,password, function(valid){
        if(valid){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));
//read the passport api docs if you wanna know what this does
passport.serializeUser(function(user, done) {
  done(null, user.id_user);
});
//read the passport api docs if you wanna know what this does
passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = function (router) {
  //login here we get the email and password and check if they're conrrect
  router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
    
    findById(req.session.passport.user, function (err, user) {
      req.session.id_user=user[0].id_user;
      req.session.username=user[0].user_name;
      req.session.id_office=user[0].id_office;
      if(user[0].id_office < 0){
        res.redirect('../admin/org');
      }else{
        res.redirect('../manager/org');
      }
    });
  });
  // here if a user wants to logout of the app
  router.get('/logout',ensureAuthenticated, function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });
  return router;
}

function findById(id, fn) {
  userMgr.getUserById(id, function(user){
    if(user){
      fn(null, user);
    } else {
      fn(new Error('User ' + id + ' does not exist'));
    }
  });
}
function findByEmail(name, fn) {
  userMgr.getUserByUserName(name, function(user){
    if(user) {
      return fn(null, user);
    } else {
      return fn(null, null);
    }
  });
}

function authenticate( user, userEnteredPassword, callback) {
  // make sure the user-entered password is equal to the previously
  // created hash when hashed with the same salt.
  easyPbkdf2.verify( user.salt, user.password, userEnteredPassword, function( err, valid ) {
      callback(valid);
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
