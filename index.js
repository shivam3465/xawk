// Required modules
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs= require('fs');
const path = require('path');
require("dotenv").config({path:"./config.env"})
const app=express()
const PORT=process.env.PORT || 5000

app.use(cors())
app.get("/", (req, res) =>{
    res.send("welcome to mining app")
})



const destination=path.join(__dirname+"/uploads");
if(!fs.existsSync(destination)){
    fs.mkdirSync(destination);
}
// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File name in the destination folder
  }
});


// Create multer upload object
const upload = multer({ storage: storage});

// Route to handle file/photo upload
app.post('/upload', upload.array("files",5), (req, res) => {
  console.log("i am called");
  if (!req.file) {
    return res.send('No files were uploaded.');
  }

  // File/photo uploaded successfully
  console.log(req.file);
  res.send('File uploaded!');
});

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
    }
    )