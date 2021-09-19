const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  login,
} = require("../../controllers/user-controller");

// Import middleware
const { authMiddleware } = require("../../utils/auth");

// authMiddleware
router.route("/").post(createUser).put(authMiddleware);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

module.exports = router;
