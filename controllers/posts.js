const Post = require('../models/Post')

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const post = await Post.find({ user: req.user.id })
            res.render('dashboard.ejs', {
                posts: post,
                user: req.user
            })
        } catch (err) {
            console.log(err)
        }
    },

    getAddPost: async (req, res) => {
        res.render('addPost.ejs')
    },


    createPost: async (req, res) => {
        try {
            await Post.create({
                title: req.body.title,
                body: req.body.body,
                status: req.body.status,
                likes: 0,
                user: req.user.id,

            });
            console.log('post has been added')
            res.redirect('/dashboard')

        } catch (err) {
            console.log(err)
        }
    },

    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: "desc" }).lean()
            res.render('feed.ejs', {
                posts: posts
            })
        } catch (err) {
            console.log(err)
        }
    },

    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            res.render('post.ejs', {
                post: post,
                user: req.user
            })
        } catch (err) {
            console.log(err)
        }
    }
}