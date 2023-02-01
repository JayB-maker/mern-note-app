const express = require("express");
const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controller/noteController");
const { protected } = require("../middleware/authMiddleware");

const route = express.Router();

route.route("/").get(protected, getNotes).post(protected, createNote);
route.route("/:id").put(protected, updateNote).delete(protected, deleteNote);

module.exports = route;
