const UserController = require("../controllers/userController");

const router = require("express").Router();

router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.get("/:id", UserController.getUser);

module.exports = router;
