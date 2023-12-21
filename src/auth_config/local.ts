import passport from 'passport';
import LocalStrategy from 'passport-local';
import * as userService from '../services/user.service';
import bcrypt from 'bcrypt';
import { User } from '../types';

passport.use(new LocalStrategy.Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (email, password, done) {
    const currentUser = await userService.findByEmail(email);

    console.log(`🚩🚩🚩That dude tries to log in! His name ${currentUser?.name || 'Stranger'}🚩🚩🚩`);

    if (!currentUser) {
      return done(null, false, { message: `User with email ${email} does not exist` });
    }

    if (!bcrypt.compareSync(password, currentUser.password)) {
      return done(null, false, { message: 'Incorrect password provided' });
    }
    return done(null, currentUser);
  }
));

export const authLocal = passport.authenticate('local', {
});

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const currentUser = await userService.findById(id);
    done(null, currentUser);

  } catch (error) {
    console.log((error as Error).message);
  }
});
