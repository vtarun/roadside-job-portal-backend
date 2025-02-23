const { updateUserRole } = require("../Controllers/UserController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

// router.get("/user", getUser);
router.put("/user", userVerification, updateUserRole);
// router.delete("/user", <what>);
// router.post("/user", <what>);


module.exports = router;