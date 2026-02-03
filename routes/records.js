const express = require("express");
const router = express.Router();

// Get DB from app locals
const getDb = (req) => req.app.locals.db;
const COLLECTION = "records";

// CREATE
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }
    const db = getDb(req);
    const docRef = await db.collection(COLLECTION).add(data);
    res.json({ id: docRef.id, ...data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const db = getDb(req);
    const snapshot = await db.collection(COLLECTION).get();
    const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const db = getDb(req);
    const id = req.params.id;
    const data = req.body;
    await db.collection(COLLECTION).doc(id).update(data);
    res.json({ id, ...data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const db = getDb(req);
    const id = req.params.id;
    await db.collection(COLLECTION).doc(id).delete();
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
