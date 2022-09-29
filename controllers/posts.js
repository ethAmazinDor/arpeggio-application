const Post = require('../models/Post')

module.exports = {
    getDashboard: async (req, res) => {
        res.render('dashboard.ejs')
    }
}