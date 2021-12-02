const express = require("express");
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

//Upload images

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


app.get("/", (req, res) => {
    res.render("index");
});

app.post('/upload', upload.single('photo'), (req, res) => {

    var bid = req.body.bid;

    //calculate hash
    const fileBuffer = fs.readFileSync(req.file.path);
    const hex = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    res.render("upload", { name: req.file.originalname, hash: hex, bid: bid });

});

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});

