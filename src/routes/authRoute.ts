import Express, { RequestHandler } from 'express'
import passport from 'passport'
import {ensureLoggedIn as ensureLogIn} from 'connect-ensure-login'
import { authenticate } from '../middleware/auth.middleware';
import { getQuotesByIdHandler } from '../controller/quoteController';
const authRoute = Express.Router()

var ensureLoggedIn = ensureLogIn();


authRoute.get("/", (req, res, next) => {
  res.send("<a href='http://localhost:4000/auth/google'>Login with Google</a>");
  next();
});

// authRoute.get('/login', function(req, res, next) {
//   res.render('login');
// });


// @desc    Auth with Google
// @route   GET /auth/google
authRoute.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
authRoute.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login',
successReturnToOrRedirect:'/'
}),
)

authRoute.get('/active', authenticate, function(req, res, next) {
  res.send("<h3>User is authenticated</h3>");

});

authRoute.post('/quote',function(req,res,next){
 console.log("this is from authroute") 
 console.log(req.user)
})

authRoute.route('/quote')
.get(getQuotesByIdHandler as RequestHandler)

// @desc    Logout user
// @route   /auth/logout

authRoute.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    // res.redirect('/'); //Inside a callback… bulletproof!
    res.send("successfully logout")

  });
});

export default authRoute