const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

app.listen(PORT, () => {
    console.log("WATSON-XD SERVER RUNNING ON PORT " + PORT);
});