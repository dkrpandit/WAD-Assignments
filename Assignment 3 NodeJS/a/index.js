const express = require('express');
const path = require('path');
const app = express();


// Define the directory for static files
const publicPath = path.join(__dirname,"public");
const indexFile = path.join(__dirname,"public","index.html");
const login = path.join(__dirname,"public","login.html");

app.use(express.static(publicPath))
console.log("path :- ",indexFile);

app.get("/", (req, res) => {
    res.sendFile(indexFile)
})
app.get("/login", (req, res) => {
    res.sendFile(login)
})

app.listen(3000, () => {
    console.log(`The server is running on port number 3000.`)
})