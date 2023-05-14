const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

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

/*---------------------- ROUTE #2: POST /api/notes/add (Add A Note )-----------------------*/
router.post("/add", fetchuser, async (req, res) => {
  const userId = req.user_id;
  const { title, description, tags } = req.body;
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

module.exports = router;
