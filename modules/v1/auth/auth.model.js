const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.authSchema({
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("auth", authSchema);
