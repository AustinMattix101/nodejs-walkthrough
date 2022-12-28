var express = require("express"),
  router = express.Router(),
  verifyToken = require('../middlewares/authJWT'),
  {
    signup,
    signin
  } = require("../controllers/auth.controller.js");

router.post("/register", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

});

router.get("/hiddencontent", verifyToken, function (req, res) {
  if (!user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  if (req.user == "admin") {
    res.status(200)
      .send({
        message: "Congratulations! but there is no hidden content"
      });
  } else {
    res.status(403)
      .send({
        message: "Unauthorised access"
      });
  }
});

module.exports = router;