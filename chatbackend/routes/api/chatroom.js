const express = require("express");
const router = express(); 

router.get("/", (req, res) => {
    const io = res.locals['socketio'];
    io.on('connect', socket => {
        socket.on('join', ({name, room}) => {
            console.log(name, room)
        })
    })
});


module.exports = router;
