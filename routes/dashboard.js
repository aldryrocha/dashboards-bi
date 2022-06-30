const express = require('express');
const router = express.Router();
const fs = require("fs");

router.get("/", function (req, res) {
    const username = req.user.username;
    const data = fs.readFileSync(__dirname + "/dashboards.json", "utf8");
    const jsonData = JSON.parse(data);
    const filtered = jsonData.dashboards.filter(item => item.username === username);
    /*console.log(filtered); */
    res.render("dashboard", { username: username, dashboards:filtered })
});

module.exports = router;