const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/add', postsController.getAddPost)
router.post('/createPost', postsController.createPost)
router.get('/:id', ensureAuth, postsController.getPost)

module.exports = router