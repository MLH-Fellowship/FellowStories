// Auth Middleware
const Stories = require('../models/Stories.js')

var middlewareObj = {
	isLoggedIn: function(req, res, next) {
		if(req.isAuthenticated()) {
			return next()
		}
		res.redirect('/login')
	}
}

middlewareObj.checkStoriesOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Stories.findOne({ file_name: req.params.file_name }, function(err, story) {
			if(err || !story) {
				res.send('Oops, story not found!')
			} else {
				if(story.owner_fellow.id.equals(req.user._id)) {
					next()
				} else {
					res.send('You do not have the permission to perform this task!')
				}
			}
		})
	} else {
		res.redirect('/login')
	}
}

module.exports = middlewareObj
