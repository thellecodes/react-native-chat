const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password , cpassword} = req.body;
  

  // query for users
  let sql = "INSERT INTO users SET ?";
  let sqlCheckEmail = `SELECT * FROM users WHERE email = ?`;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if(password !== cpassword){
    return res.status(400).json({ msg: "Please Confirm your password" });
  }

  // Check for existing user
  db.query(sqlCheckEmail, email, (err, user) => {
    if (user.length > 0) {
      return res.status(400).json({ msg: "Sorry this user aldready exists" });
    } else {
      let newUser = { name, email, password };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return res.status(401).json({ msg: "Try again after 50mins" });
          }
          newUser.password = hash;

          db.query(sql, newUser, (err, result) => {
            if (err) {
              return res.status(401).json({ msg: "Try again after 50mins" });
            }

            if (result) {
              let lastQuery = `SELECT * FROM users WHERE id = ?`;
              db.query(lastQuery, result.insertId, (err, user) => {
                console.log(user[0].id);

                jwt.sign(
                  { id: result.insertId },
                  config.get("jwtSecret"),
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) {
                      return res.status(401).json({ msg: "Unknown request" });
                    }
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
      });
    }
  });

  // Create salt & hash
});

module.exports = router;
