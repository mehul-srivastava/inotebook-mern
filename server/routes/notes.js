// Imports
const express = require("express");
const router = express.Router();
const validator = require("express-validator");

// Models
const Note = require("../models/Note");

// Middlewares
const fetchuser = require("../middleware/fetchuser");

/*---------------------- ROUTE #1: POST /api/notes/ (Get All Notes)-----------------------*/
router.post("/", fetchuser, async (req, res) => {
  const userId = req.user_id;
  try {
    const notes = await Note.find({ user_id: userId });
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

/*---------------------- ROUTE #2: POST /api/notes/add (Add A Note)-----------------------*/
const addNoteValidation = [
  validator.body("title", "Title cannot be empty!").isLength({ min: 1 }),
  validator
    .body("description", "Description cannot be empty!")
    .isLength({ min: 1 }),
];
router.post("/add", fetchuser, addNoteValidation, async (req, res) => {
  //Request Validation
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors });

  //Destructuring Data
  const userId = req.user_id;
  const { title, description, tags } = req.body;

  //Add Note To Database
  try {
    const note = await Note.create({
      user_id: userId,
      title,
      description,
      tags,
    });
    res.status(200).json(note);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

/*---------------------- ROUTE #3: DELETE /api/notes/:id (Delete A Note)-----------------------*/
router.delete("/:id", fetchuser, async (req, res) => {
  let note = await Note.findById(req.params.id);

  // Throw Error If Note Does Not Exist
  if (!note)
    return res.status(500).json({ error: "Note With This ID Does Not Exist!" });

  // Throw Error If Note Does Not Belong To Logged In User
  if (note.user_id.toString() !== req.user_id)
    return res
      .status(401)
      .json({ error: "You Are Not Authorized To Delete This Note!" });

  // Delete The Note
  try {
    note = await note.deleteOne();
    return res.status(200).json({ note });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

/*---------------------- ROUTE #3: PUT /api/notes/:id (Update A Note)-----------------------*/
router.put("/:id", fetchuser, async (req, res) => {
  // Destructure Request
  const { title, description, tags } = req.body;

  // Create An Empty Note Object
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tags) newNote.tags = tags;

  // Throw Error If Note Does Not Exist
  let note = await Note.findById(req.params.id);
  if (!note)
    return res.status(500).json({ error: "Note With This ID Does Not Exist!" });

  // Throw Error If Note Does Not Belong To Logged In User
  if (note.user_id.toString() !== req.user_id)
    return res
      .status(401)
      .json({ error: "You Are Not Authorized To Update This Note!" });

  try {
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.status(200).json(note);
  } catch (e) {
    res.status(400).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
