import passport from 'passport';
import LocalStrategy from 'passport-local';
import * as phoneService from '../services/phone.service';
import bcrypt from 'bcrypt';

passport.use(new LocalStrategy.Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (email, password, done) {
    console.log(email, password);
    const currentUser = await phoneService.getById('1');

    if (!currentUser) {
      return done(null, false, { message: `User with email ${email} does not exist` });
    }

    if (!bcrypt.compareSync(password, currentUser.id)) {
      return done(null, false, { message: 'Incorrect password provided' });
    }
    return done(null, currentUser);
  }
));

export const authLocal = passport.authenticate('local', {
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await phoneService.getById('1');
  done(null, currentUser);
});
