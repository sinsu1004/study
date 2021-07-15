const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api=require('./app');
const app = express();

const db= require("./app/models");
db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

var corOptions = {
  origin: "http://localhost:8081",
};


app.use(cors(corOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/mainjscss/main.css',express.static(__dirname +"/mainjscss/main.css"));
app.use('/mainjscss/main.js',express.static(__dirname +"/mainjscss/main.js"));

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
  
});
app.get("/home",function(req,res){
  res.render('main.html')
})
app.get("/hi",(req,res)=>{
    res.send('hi');
})
//app.get('/test/:id',api.getUserById);


require("./app/routes/turorial.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}!`);




});
