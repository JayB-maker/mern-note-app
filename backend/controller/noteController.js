const noteModel = require("../models/noteModels");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await noteModel.find({ user: req.user.id });
  res.status(200);
  res.json( notes );
});

const createNote = asyncHandler(async (req, res) => {
  const { note, details } = req.body;
  if (!note || !details) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const newNote = await noteModel.create({
    note: note,
    details: details,
    user: req.user.id
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

  const updatedNote = await noteModel.findByIdAndUpdate(
    req.params.id,
    {
      note: req.body.note,
      details: req.body.details,
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
