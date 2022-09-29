const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const postController = require('../controllers/posts')

router.get("/", homeController.getIndex);
router.post('/login', authController.postLogin) //for login authentication
router.get('/login', authController.getLogin)
router.get('/dashboard', ensureAuth, postController.getDashboard) //where we left off: make a dashboard view so we can finish the sign up 
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)


module.exports = router