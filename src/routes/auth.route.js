const router = require('express').Router();
const passport = require('passport');
// path: auth/

// GET /login
router.get('/login', (req, res) => {
    res.render('login');
});

// GET /google/login
router.get('/google/login', passport.authenticate('google', {
    scope: ['profile', 'email']
}));


// GET /google/callback
router.get(
    '/google/callback',
    passport.authenticate('google'),
    function (req, res) {
        console.log(req.query.code);
        // Successful authentication, redirect to “/”
        res.redirect('/');
    }
);

// GET /verifyLogin
router.get('/verifyLogin', (req, res) => {
    if (req.isAuthenticated()) {
        res.header('name', req.user.name);
        res.header('img', req.user.imageUrl);
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Not authorized');
    }
});

// GET /logout
router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.render('home');
});

module.exports = router;