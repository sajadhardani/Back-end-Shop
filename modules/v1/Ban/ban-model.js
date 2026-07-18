const { default: mongoose } = require("mongoose");

const banSchema = new mongoose.banSchema({
    phone:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Ban", banSchema);
