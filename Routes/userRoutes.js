const { updateUserRole } = require("../Controllers/UserController");

const router = require("express").Router();

// router.get("/user", <what>);
router.put("/user", updateUserRole);
// router.delete("/user", <what>);
// router.post("/user", <what>);


module.exports = router;