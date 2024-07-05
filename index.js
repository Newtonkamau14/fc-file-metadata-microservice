require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');


const app = express();

//middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


//serve static files
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const upload = multer({ dest: 'uploads/' });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});