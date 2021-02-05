const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

AdminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin_Docusaurs", AdminSchema);
