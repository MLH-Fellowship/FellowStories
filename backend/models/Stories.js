const mongoose = require("mongoose");

const StoriesSchema = new mongoose.Schema({
    file_name: String,
    owner_fellow: {
    	id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User_Docusaurus"
		}
    },
    published_timestamp: { type : Date, default: Date.now },
    last_edited_timestamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model("Stories_Docusaurs", StoriesSchema);
