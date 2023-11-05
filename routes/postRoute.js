const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router
  .route("/")
  .get(postController.getPost)
  .post(postController.addPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
