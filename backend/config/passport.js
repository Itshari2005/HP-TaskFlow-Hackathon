// backend/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Serialize user (used for session, still needed for completeness)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user (not used in JWT flow but must be present)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
  $or: [
    { googleId: profile.id },
    { email: profile.emails?.[0]?.value }
  ]
});

if (user) {
  // Link Google ID if it's missing
  if (!user.googleId) {
    user.googleId = profile.id;
    await user.save();
  }
} else {
  user = await User.create({
    googleId: profile.id,
    name: profile.displayName,
    email: profile.emails?.[0]?.value || '',
  });
}

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback',
      scope: ['user:email'], // ensures email is requested
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('🔍 GitHub profile received:', profile);
        const email =
          profile.emails?.[0]?.value || `${profile.username}@github.local`;

        let user = await User.findOne({
          $or: [
            { githubId: profile.id },
            { email: email }
          ]
        });

        if (user) {
          // Link GitHub ID if not already linked
          if (!user.githubId) {
            user.githubId = profile.id;
            await user.save();
          }
        } else {
          user = await User.create({
            githubId: profile.id,
            name: profile.displayName || profile.username,
            email: email,
          });
        }

        done(null, user);
      } catch (err) {
        console.error('GitHub Strategy Error:', err);
        done(err, null);
      }
    }
  )
);

