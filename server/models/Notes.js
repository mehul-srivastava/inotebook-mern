const mongoose = require("mongoose");

const NoteSchema = new mongoose.schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", NoteSchema);
