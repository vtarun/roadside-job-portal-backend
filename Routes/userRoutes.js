const { updateUserRole, updateUser } = require("../Controllers/UserController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.put("/user", userVerification, updateUserRole);
router.post("/user", userVerification, updateUser);


module.exports = router;