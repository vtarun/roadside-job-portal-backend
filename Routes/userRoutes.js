const { updateUserRole, updateUser, updateSavedJobs } = require("../Controllers/UserController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.put("/user", userVerification, updateUserRole);
router.post("/user", userVerification, updateUser);
router.put("/saved-jobs/:jobId", userVerification, updateSavedJobs);


module.exports = router;