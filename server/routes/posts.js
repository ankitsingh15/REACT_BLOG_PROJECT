const router = require("express").Router();
const PostController = require("../controllers/postController");

router.post("/", PostController.addPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/:id", PostController.getById);
router.get("/", PostController.getAllPost);

module.exports = router;
