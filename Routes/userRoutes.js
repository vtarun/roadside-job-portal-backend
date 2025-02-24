const { updateUserRole, updateUser } = require("../Controllers/UserController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

// router.get("/user", getUser);
router.put("/user", userVerification, updateUserRole);
// router.delete("/user", <what>);
router.post("/user", userVerification, updateUser);


module.exports = router;