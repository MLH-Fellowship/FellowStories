const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    stories: [
	    {
	        type: mongoose.Schema.Types.ObjectId,
	        ref: "Stories_Docusaurus"
	    }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User_Docusaurs", UserSchema);
