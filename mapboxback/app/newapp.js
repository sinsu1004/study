const api = require('./api/api.js');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.listen(port, () => {
  console.log(`Horror movie app is running on port ${port}.`);
});


app.use('/mainjscss/main.css', express.static(__dirname + "/mainjscss/main.css"));
app.use('/mainjscss/main.js', express.static(__dirname + "/mainjscss/main.js"));
app.use('/mainjscss/truck_flat.glb', express.static(__dirname + "/mainjscss/truck_flat.glb"));
app.use('/mainjscss/Mosque.gltf', express.static(__dirname + "/mainjscss/Mosque.gltf"));
app.use('/mainjscss/c.glb', express.static(__dirname + "/mainjscss/c.glb"));
app.use('/mainjscss/b.gltf', express.static(__dirname + "/mainjscss/b.gltf"));
app.get("/home", (req, res) => {
  res.sendFile(__dirname + '/views/main.html');
})

require("./routes/api.routes.js")(app);
