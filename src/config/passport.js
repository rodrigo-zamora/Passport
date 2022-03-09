const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
    new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('working');
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);
            // lookpu user using User class
            let user = User.find(profile.id);
            user.then(user => {
                console.log('user POPO PASSPORT: ', user);
                if (user) {
                    return done(null, user);
                } else {
                    console.log('user not found CREATING ONE');
                    let newUser = User.create({
                        id: profile.id,
                        email: profile.emails[0].value,
                        imageUrl: profile.photos[0].value,
                        name: profile.displayName
                    });
                }
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.find(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});