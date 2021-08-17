const api = require('./api/api.js');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const https =require('https');
const fs=require('fs');
const app = express();
const port = 5000;
const port2 = 443;


const options = {
  key: fs.readFileSync(__dirname+'/ssl/private.pem'),
  cert: fs.readFileSync(__dirname+'/ssl/public.pem')

};

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.listen(port, () => {
    console.log(`Horror movie app is running on port ${port}.`);
  });
https.createServer(options,app).listen(port2,function(){
  console.log(`Horror movie app is running on port ${port2}.`);
});


app.use('/mainjscss/main.css', express.static(__dirname + "/mainjscss/main.css"));
app.use('/mainjscss/main.js', express.static(__dirname + "/mainjscss/main.js"));
app.use('/mainjscss/truck_flat.glb', express.static(__dirname + "/mainjscss/truck_flat.glb"));
app.use('/a', express.static(__dirname + "/mainjscss/Mosque.gltf"));
app.use('/c', express.static(__dirname + "/mainjscss/c.glb"));
app.use('/b', express.static(__dirname + "/mainjscss/b.gltf"));
app.get("/home", (req, res) => {
  res.sendFile(__dirname + '/views/main.html');
})

require("./routes/api.routes.js")(app);
