const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const db = require("../../config/db");

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  console.warn(req.body);

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // sql for user
  let sqlCheckEmail = `SELECT * from users WHERE email = ?`;

  // Check for existing user
  db.query(sqlCheckEmail, email, (err, user) => {
    if (user.length < 1) {
      return res.status(400).json({ msg: "User does not exist" });
    } else {
      let currentUser = user[0];

      // Validate password
      bcrypt.compare(password, user[0].password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        jwt.sign(
          { id: user[0].id },
          config.get("jwtSecret"),
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email
              }
            });
          }
        );
      });
    }
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  const token = req.header("x-auth-token");
  let sqlCheckUserId = `SELECT * FROM users WHERE id = ?`;
  db.query(sqlCheckUserId, req.user.id, (err, user) => {
    if (user.length > 0) {
      return res.json({
        user: user[0],
        token
      });
    }
  });
});

module.exports = router;
