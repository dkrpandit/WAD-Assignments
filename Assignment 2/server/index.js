const express = require("express");
const app = express();
const connection = require("./utils/db");
const router = require("./router/auth-router");



// handling cors polices
// const corsOptions = {
//     origin: "https://earnest-gaufre-573098.netlify.app",
//     methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
//     credentials: true
// };
// app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;

connection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});