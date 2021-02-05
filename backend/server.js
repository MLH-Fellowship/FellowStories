const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bodyParser = require('body-parser')
const User = require('./models/User.js')
const Admin = require('./models/Admin.js')
const userRoutes = require('./routes/UserRoutes.js')
require('dotenv').config({ path: `${__dirname}/config.env` })

const app = express()

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(require('express-session')({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// passport.use('userLocal', new LocalStrategy(User.authenticate()));
// passport.use('adminLocal', new LocalStrategy(Admin.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  if(user!=null)
    done(null,user);
});

mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0-ulpnb.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.log("Error: ", err.message);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('App running')
})

app.use("/", userRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})
