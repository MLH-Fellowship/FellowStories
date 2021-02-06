const express = require('express')
const simpleGit = require('simple-git')
const fs = require('fs')
const router = express.Router()
const git = simpleGit()
const middleware = require("../middleware/auth.js")

const User = require('../models/User.js')
const Stories = require('../models/Stories.js')

// const {} = require()

router.get('/new-story', function (req, res) {
  res.send('Add a new story!')
})

router.post('/new-story', middleware.isLoggedIn, function (req, res) {
  // Save story
  let file_name = new Date()
  file_name = file_name.toISOString().slice(0,10)
  // todo: add functionality for multiple users to add multiple blogs on the same day
  let owner_fellow = {
    id: req.user._id
  }
  let newStory = {
    file_name: file_name,
    owner_fellow: owner_fellow
  }
  // Add to user
  User.findById(req.user._id, function (err, user) {
    if(err) {
      console.log(err)
      res.redirect("/")
    } else {
      Stories.create(newStory, function (err, story) {
        if(err) {
          console.log(err)
        } else {
          story.save()
          user.stories.push(story)
          user.save()

          // Save to stories and push to GitHub
          let title = req.body.title
          let content = req.body.content
          fs.writeFile(`../FellowStories/stories/${file_name}.md`, `---\ntitle: ${title}\nauthor: ${user.first_name} ${user.last_name}\n---\n${content}\n`, function (err) {
            if (err) throw errs
            git.cwd('../FellowStories')
              .add('./*')
              .commit('add: new blog')
              // .push('origin', 'main') // uncomment once no more changes are left to add to front-end to avoid conflicts
              // .pull() // pull to keep reppsitory updated
          })

          res.send("Successfully posted story!")
        }
      })
    }
  })
})

module.exports = router
