const router = require("express").Router();

const passport = require("passport");
const cache = require("../middlewares/cachePolicy");
const url = require("../controllers/url");
const googleAuth = require("../controllers/googleAuth");

router.post("/shorten", url.shorten);
router.get("/:code", cache, url.redirect);

// auth logout
router.get("/auth/logout", googleAuth.logout);

// auth with google+
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback route for google to redirect to
router.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  googleAuth.redirect
);

module.exports = router;
