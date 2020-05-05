const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../config/db");

// @route
// @private
// Post Route

router.post("/", auth, (req, res) => {
  const { title, eventName, details, start, end } = req.body;

  if (!title || !eventName || !details)
    return res.status(400).json({ msg: "Please Fill all values" });

  let sqlQuery = `INSERT INTO items SET ?`;

  let newItem;

  if (start) {
    newItem.start, newItem.end;
  }

  newItem = {
    title,
    body: details,
    category: eventName
  };

  db.query(sqlQuery, newItem, (err, result) => {
    if (err) return res.status(401).json({ msg: "Try again after 20 mins" });

    if (result) {
      let getQuery = `SELECT * FROM items WHERE id = ?`;

      db.query(getQuery, result.insertId, (err, item) => {
        if (err) {
          return res.status(401).json({ msg: "Unknow Error Occurred" });
        }
        res.status(200).json(item[0]);
      });
    }
  });
});

// @route
// Private
// Get all post

router.get("/", auth, (req, res) => {
  let getQuery = `SELECT * FROM items`;

  db.query(getQuery, (err, result) => {
    return res.status(200).json(result);
  });
});

module.exports = router;
