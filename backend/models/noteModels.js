const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "user",
    // },
    note: {
      type: String,
      required: [true, "Please Enter a note"],
    },
    details: {
      type: String,
      required: [true, "Please Enter the details"],
    },
  },
  { timestamps: true }
);

const noteModel = mongoose.model("noteSchema", noteSchema);

module.exports = noteModel;
