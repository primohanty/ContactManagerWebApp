const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Contact", contactSchema);
