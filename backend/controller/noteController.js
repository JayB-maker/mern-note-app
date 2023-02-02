const noteModel = require("../models/noteModels");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/usermodels");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await noteModel.find({ user: req.user.id });
  res.status(200);
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { note, details, categories } = req.body;
  if (!note || !details || !categories) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const newNote = await noteModel.create({
    note: note,
    details: details,
    categories: categories,
    user: req.user.id,
  });
  res.status(200);
  res.json(newNote);
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await noteModel.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  const user = await userModel.findById(req.user.id);

  if(!user){
    res.status(400);
    throw new Error("User not found");
  }

  if (note.user.toString() !== user.id) {
    res.status(400);
    throw new Error("Unauthorized user");
  }

  const updatedNote = await noteModel.findByIdAndUpdate(
    req.params.id,
    {
      note: req.body.note,
      details: req.body.details,
      categories: req.body.categories,
    },
    { new: true }
  );
  res.status(200);
  res.json(updatedNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await noteModel.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  const user = await userModel.findById(req.user.id);

  if(!user){
    res.status(400);
    throw new Error("User not found");
  }

  if (note.user.toString() !== user.id) {
    res.status(400);
    throw new Error("Unauthorized user");
  }

  await note.remove();
  res.status(200);
  res.json(req.params.id);
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
