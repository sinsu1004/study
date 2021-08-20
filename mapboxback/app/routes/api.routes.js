module.exports = app =>{
    const api= require("../api/api.js");

    var router = require("express").Router();

    router.post('/data',api.datatest);
    router.post('/data2',api.userdata);
    router.post('/dd',api.tiledata);
    router.post('/dd2',api.buydata);


    router.post('/test',api.citydata);
    
    
    app.use('/test',router);


    
};