const express = require("express");
const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controller/noteController");

const route = express.Router();

route.route("/").get(getNotes).post(createNote);
route.route("/:id").put(updateNote).delete(deleteNote);

module.exports = route;
