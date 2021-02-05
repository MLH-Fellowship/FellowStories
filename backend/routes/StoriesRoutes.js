const express = require('express')\
const simpleGit = require('simple-git')
const router = express.Router()
const git = simpleGit()


const User = require('../models/User.js')
const Stories = require('../models/Stories.js')

// const {} = require()

router.post('/', async (req, res) => {
  // Get body
  const { file_name, fellow_id } = req.body

  try {
    // Save Story
    const newStory = new Stories({
      file_name: file_name,
      owner_fellow: fellow_id
    })

    await newStory.save()
    // Add to user
    // Push to GitHub
  }
})
module.exports = router
