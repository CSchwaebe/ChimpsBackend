import * as  passport from "passport";

import passportLocal from "passport-local";

import { User, UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;


passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
  UserModel.findOne({ username: username.toLowerCase() }, (err, user: any) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${username} not found.` });
    }
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(undefined, user);
      }
      return done(undefined, false, { message: "Invalid email or password." });
    });
  });
}));



/**
 * Login Required middleware.
 
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/**
 * Authorization Required middleware.
 
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split("/").slice(-1)[0];

  if (.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};

*/